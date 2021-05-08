const Discord = require('discord.js');
const moment = require("moment");


module.exports.run = async (client, message, args) => {
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first()
  } else if (!message.mentions.users.first() && args[0]) {
    let pre = message.guild.members.cache.get(args[0])
    user = pre.user
  } else {
    user = message.author;
  }

const member = message.guild.member(user);


  const embed = new Discord.MessageEmbed()
  .setColor("#007FFF")
    .setThumbnail(user.avatarURL())
    .setTitle(user.tag)
    .addField("ID:", `${user.id}`, true)
    .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
    .addField("Account Creation Date:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
    .addField("Server Join Date:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
    .addField("Status:", `${user.presence.status}`, true)
    //.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField("Roles:", member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp()
  message.channel.send({ embed });
};


module.exports.help = {
  name: "userinfo",
  description: "Displays user's info.",
  aliases: ["whois", "userinfo", "who", "whoami", "ui", "user"],
  category: "Info"
}