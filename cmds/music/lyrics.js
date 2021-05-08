const Discord = require("discord.js")
const genius = require("genius-lyrics")
const Genius = new genius.Client('GENIUS_KEY')

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Usage: `!!lyrics <Song Name>`")
    let msg = await message.channel.send(":mag: Searching.").then(message => {
        setTimeout(function () {
            message.edit(":mag_right: Searching..").then(message => {
                setTimeout(function () {
                    message.edit(":mag: Searching...").then(message => {
                        setTimeout(function () {
                            message.edit(":mag_right: Searching....")
                        }, 2500)
                    })
                }, 2500)
            })
        }, 2500)
    })
    Genius.tracks.search(args.join(" ")).then(songs => {
        const song = songs[0]
        song.lyrics().then(lyric => {
            if (!lyric) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Genius Music Search")
                    .setTitle("❯ " + song.title)
                    .setURL(song.url)
                    .addField("Title", song.title)
                    .addField("Artist", song.artist.name)
                    .addField("Release", song.releasedAt)
                    .addField("Lyrics", `Lyrics Currently Unavailable [View Lyrics](${song.url})`)
                    .setThumbnail(song.image)
                    .setColor("007FFF")
                    .setFooter(`Requested By: ${message.author.tag}`)
                    .setTimestamp();
                if (song.album) embed.addField("Album", song.album.name)
                message.channel.bulkDelete(1)
                message.channel.send(embed)
            } else {
                let text = lyric.toString()
                if (text.length > 900) {
                    text = text.substring(0, 900)
                    let last = text.lastIndexOf(" ")
                    text = text.substring(0, last)
                    text = text + ` ... [[View Full]](${song.url})`
                }
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Genius Music Search")
                    .setTitle("❯ " + song.title)
                    .setURL(song.url)
                    .addField("Title", song.title)
                    .addField("Artist", song.artist.name)
                    .addField("Release", song.releasedAt)
                    .addField("Lyrics", text)
                    .setThumbnail(song.image)
                    .setColor("007FFF")
                    .setFooter(`Requested By: ${message.author.tag}`)
                    .setTimestamp();
                if (song.album) embed.addField("Album", song.album.name)
                message.channel.bulkDelete(1)
                message.channel.send(embed)
            }
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
module.exports.help = {
    name: "lyrics",
    description: "View Information + Lyrics on a song using Genius.",
    aliases: ["lyrics", "lyric", "song", "songinfo", "musicinfo", "genius"],
    category: "Music"
}