const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voice.voiceChannel
  const serverQueue = bot.queue.get(message.guild.id)

  if (!message.member.voice.channel) return message.channel.reply("You need to be in the voice channel to skip songs.")
  if (!serverQueue) return message.channel.send("There's nothing playing")
  serverQueue.connection.dispatcher.end()
  message.channel.send("Song skipped :white_check_mark:")
  return undefined;
}
module.exports.help = {
  name: "skip",
  description: "Skip to the next song in the queue.",
  aliases: ["skip", "fs", "next"],
  category: "Music"
}