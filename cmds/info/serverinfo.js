const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 let channels = Array.from(message.guild.channels.cache.values()).filter(channel => channel.type !== null).length;
	let region = message.guild.region;
      region = region.replace(/-/g, ' ').toUpperCase()
  let members = Array.from(message.guild.members.cache.values()).filter(mem => !mem.user.bot).length;
  let sicon = message.guild.iconURL();
  
  let serverembed = new Discord.MessageEmbed()
  .setTitle("Server Information")
  .setColor("#007FFF")
  .setThumbnail(sicon)
	.addField('Name', `${message.guild.name} (${message.guild.nameAcronym})`, true)
  .addField('Owner', message.guild.owner.user.tag, true)
  .addField('Id', message.guild.id, true)
  .addField('Region', region, true)
  .addField('Members', members, true)
  .addField('Channels', channels, true)
  .addField("Server Create Date", message.guild.createdAt)
  .addField("Member Count", message.guild.memberCount)
  .setFooter(`Requested by ${message.author.tag}`);

  return message.channel.send(serverembed);
}


module.exports.help = {
  name: "serverinfo",
  description: "Gathers information on the server.",
  aliases: ["serverinfo", "serverstats", "server"],
  category: "Info"
}
