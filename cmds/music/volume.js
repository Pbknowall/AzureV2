const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voice.voiceChannel
  const serverQueue = bot.queue.get(message.guild.id)
  if(!serverQueue) return message.channel.send("Nothing is Playing!")
  let volumepercentile = serverQueue.volume * 20
  if(!serverQueue.volume) return message.channel.send("Nothing is Playing!")

  if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands")
  if (!serverQueue) return message.channel.send("There is nothing currently playing.")
  if(!args[0]) return message.channel.send("Current volume is " + volumepercentile + " / 100")
  if(isNaN(args[0])) return message.channel.send("Please specify a number.")
  if(args[0] > 100) return message.channel.send("Please set the volume with a number from 10 to 100")
  if(args[0] < 10) args[0] = 10
  let newvolumepercentile = args[0]
  serverQueue.volume = Math.round(args[0] / 20)
  serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  message.channel.send(`Volume Set: ${args[0]}`)
  
}
module.exports.help = {
  name: "volume",
  description: "Change the music volume.",
  aliases: ["volume", "vol", "loudness"],
  category: "Music"
}