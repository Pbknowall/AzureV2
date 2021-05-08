const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Only server staff can use this command.")
  const snipes = bot.snipes.get(message.channel.id) || [];
  const msg = snipes[args[0] - 1 || 0];
  if (!msg) return message.channel.send("Nothing to snipe!");
  const snipembed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setFooter(`${msg.date} - ${args[0] || 1}/${snipes.length}`)
    .setColor("#007FFF")
  if (msg.attachment) snipembed.setImage(msg.attachment);
  message.channel.send(snipembed);
}

module.exports.help = {
  name: "snipe",
  description: "Snipe a deleted message.",
  aliases: ["snipe", "plsnipe", "plssnipe"],
  category: "Fun"
}