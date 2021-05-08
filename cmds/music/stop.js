const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const serverQueue = bot.queue.get(message.guild.id)

  const voiceChannel = message.member.voice.channel
  if (!message.member.voice.channel) return message.reply("You need to be in the voice channel to stop the music.")
  if (!serverQueue) return message.reply("There is nothing playing")
  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
  voiceChannel.leave().catch((err) => console.log(err))
  message.channel.send(":stop_button: Music stopped.")
}
module.exports.help = {
  name: "stop",
  description: "Stops playing music and leaves the voice channel.",
  aliases: ["stop", "leave", "s"],
  category: "Music"
}