const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voice.voiceChannel
  const serverQueue = bot.queue.get(message.guild.id)

  if (!message.member.voice.channel) return message.channel.reply("You need to be in the voice channel to pause music!")
  if (!serverQueue) return message.channel.send("There's nothing playing!")
  if(!serverQueue.playing) return message.channel.send("The music is already paused.")
  serverQueue.playing = false
  serverQueue.connection.dispatcher.pause()
  let pause = new Discord.MessageEmbed()
  .setAuthor("⏸️ Music Paused")
  .setColor("#007FFF")
  message.channel.send(pause)

}
module.exports.help = {
  name: "pause",
  description: "Pause the current song.",
  aliases: ["pause"],
  category: "Music"
}