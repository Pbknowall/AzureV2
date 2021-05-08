const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;

    var msg = message.content.toUpperCase();
    var args = msg.split(" ")
    let arg = message.content.split(" ").slice(1);
    if (!args[1]) return message.channel.send("`You have to provide a message for me to say!`");
  
  let sayembed = new Discord.MessageEmbed()
  .setColor("36393E")
  .setTitle(arg.join(" "))
  .setFooter(`From ${message.author.tag}`)
  
  
  message.channel.bulkDelete(1)
  message.channel.send(sayembed);

}

module.exports.help = {
  name: "say",
  description: "Make the bot return a message.",
  aliases: ["say", "send", "echo"],
  category: "Fun"
}