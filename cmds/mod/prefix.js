const Discord = require("discord.js")
const db = require("quick.db")



module.exports.run = async (bot, message, args) => {
  const set = new db.table("guildSettings")

  let prefix;
  prefix = set.get(`prefix_${message.guild.id}.prefix`)
  if(!set.has(`prefix_${message.guild.id}.prefix`)) prefix = "!!"
  let usagembed = new Discord.MessageEmbed().setTitle("Prefix Settings").setDescription(`Current Prefix: **${prefix}**\nUsage: \`!!prefix <prefix>\``).setColor("#007FFF")
  

  if (!args[0]) {
    return message.channel.send(usagembed)
  } else if (args[0] === "!!") {
    set.delete(`prefix_${message.guild.id}`)
  } else if (args[0].length > 3) {
    return message.react("🚫").then(() => message.channel.send("My prefix can only have up to 2 characters"))
  }


  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Only members with the Manage-Server permission can change my prefix!");
  set.set(`prefix_${message.guild.id}.prefix`, args[0])


  let sEmbed = new Discord.MessageEmbed()
    .setColor("#007FFF")
    .setTitle("New Prefix Set")
    .setDescription(`Server Prefix set to ${set.get(`prefix_${message.guild.id}.prefix`)}`);

  message.channel.send(sEmbed);

}


module.exports.help = {
  name: "prefix",
  description: "Change the bot prefix for your server.",
  aliases: ["prefix"],
  category: "Mod"
}