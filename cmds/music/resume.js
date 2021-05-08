const Discord = require("discord.js");
const ytdl = require("ytdl-core")


module.exports.run = async (bot, message, args) => {
  const voiceChannel = message.member.voice.voiceChannel
  const serverQueue = bot.queue.get(message.guild.id)

  if (!message.member.voice.channel) return message.channel.reply("You need to be in the voice channel to resume music!")
  if (!serverQueue) return message.channel.send("There's nothing playing!")
  if(serverQueue.playing) return message.channel.send("The music is already playing!")
  serverQueue.playing = true
  serverQueue.connection.dispatcher.resume()
  let resume = new Discord.MessageEmbed()
  .setAuthor("▶️ Music Resumed")
  .setColor("#007FFF")
  message.channel.send(resume)

}
module.exports.help = {
  name: "resume",
  description: "Resumes the queue if paused.",
  aliases: ["resume", "replay", "unpause", "r"],
  category: "Music"
}