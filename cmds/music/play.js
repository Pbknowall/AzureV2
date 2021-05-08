const Discord = require("discord.js");
const Util = require("discord.js");
const ytdl = require("ytdl-core")
const YouTube = require("simple-youtube-api")


module.exports.run = async (bot, message, args) => {
    let serverQueue = bot.queue.get(message.guild.id)
    if(!args[0]) return message.channel.send("Usage: `!!play <Link/Search Query>`")
    const searchString = args.slice(0).join(" ")
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : ""

    const youtube = new YouTube(process.env.apikey)
    const voiceChannel = message.member.voice.channel



    if (!voiceChannel) return message.reply("Please enter a voice channel!")
    const perm = voiceChannel.permissionsFor(message.guild.me)
    if (!perm.has("CONNECT" || "SPEAK")) return message.channel.send("To enter and play music I need permissions to **Connect** and to **Speak**")

    try {
        let video = await youtube.getVideoByID(url)
    } catch {
        try {
            const videos = await youtube.searchVideos(searchString, 1)
            video = await youtube.getVideoByID(videos[0].id)
        } catch (err) {
            console.log(err)
            message.channel.send(err.message)
            return message.channel.send("Nothing found for your search query!")
        }
    }

    let playtime = `${video.duration.hours}h `
    if (video.duration.hours === 0) playtime = ""

    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        duration: `${playtime}${video.duration.minutes}m ${video.duration.seconds}s`,
        thumbnail: video.thumbnails.default.url
    }

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true
        }
        bot.queue.set(message.guild.id, queueConstruct)

        queueConstruct.songs.push(song)

        try {
            let connection = await voiceChannel.join()
            queueConstruct.connection = connection
            play(message.guild, queueConstruct.songs[0])
        } catch (err) {
            console.log("An error occurred while joining a voice channel in " + message.guild.name + " (" + message.guild.id + ") : " + err)
            bot.queue.delete(message.guild.id)
            message.channel.send("An error occurred while joining your voice channel.")
        }

    } else {
        serverQueue.songs.push(song)
        return message.channel.send(`**${song.title}** added to the queue.`)
    }








    function play(guild, song) {
        const serverQueue = bot.queue.get(guild.id)

        if (!song) {
            voiceChannel.leave()
            bot.queue.delete(guild.id)
            return
        }

        const dispatcher = serverQueue.connection.play(ytdl(song.url))
            .on("finish", () => {
                serverQueue.songs.shift()
                play(guild, serverQueue.songs[0])
            })
            .on("error", error => {
                console.log(error)
            })
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

        let visual
        if (serverQueue.volume === 1) {
            visual = "▂"
        } else if (serverQueue.volume === 2) {
            visual = "▂▃"
        } else if (serverQueue.volume === 3) {
            visual = "▂▃▅"
        } else if (serverQueue.volume === 4) {
            visual = "▂▃▅▆"
        } else if (serverQueue.volume === 5) {
            visual = "▂▃▅▆▇"
        }
        if (video.duration.hours === 0) playtime = ""
        let playembed = new Discord.MessageEmbed()
            .setAuthor("Now Playing")
            .setTitle(song.title)
            .addField("Volume", `${serverQueue.volume * 20} / 100 - 🔊 ${visual}`)
            .addField("Duration", song.duration)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setTimestamp()
            .setFooter(`Requested By ${message.author.tag}`)
            .setColor("#007FFF")
            
        serverQueue.textChannel.send(playembed)
    }
}

module.exports.help = {
    name: "play",
    description: "Play a song from YouTube.",
    aliases: ["play", "p", "yt", "youtube"],
    category: "Music"
}