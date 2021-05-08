const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voice.voiceChannel
  const serverQueue = bot.queue.get(message.guild.id)

  if (!message.member.voice.channel) return message.channel.reply("You need to be in the voice channel to skip songs.")
  if (!serverQueue) return message.channel.send("There's nothing playing!")
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


  let queuembed = new Discord.MessageEmbed()
    .setTitle("Song Queue")
    .setDescription(serverQueue.songs.map(song => `** • ** ["${song.title}"](${song.url}) - ${song.duration}`).join("\n"))
    .addField("**Now Playing**", `\"${serverQueue.songs[0].title}\"`)
    .addField("Volume", `${serverQueue.volume * 20} / 100 - 🔊 ${visual}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    .setTimestamp()
    .setFooter(`Requested By ${message.author.tag}`)
    .setColor("#007FFF")
  message.channel.send(queuembed)

}
module.exports.help = {
  name: "queue",
  description: "View the current server queue.",
  aliases: ["queue", "list", "nowplaying", "playing", "np", "q"],
  category: "Music"
}