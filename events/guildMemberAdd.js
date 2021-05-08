const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

module.exports = (bot, member) => {
  let setting = new db.table('guildSettings')
  let chl = setting.get(`joinlog_${member.guild.id}`, { target: '.joinch' })
  let channel = member.guild.channels.cache.find(channel => channel.id === chl)

  if (channel) {
    let o = setting.get(`joinlog_${member.guild.id}`, { target: '.joinmsg' })
    if (!o || o === undefined) o = "Welcome <user>\!"

    let a = o.replace(/<user>/g, `<@${member.user.id}>`)
    let b = a.replace(/<username>/g, `${member.user.username}`)
    let c = b.replace(/<membercount>/g, `${member.guild.memberCount}`);
    let d = c.replace(/<server>/g, `${member.guild.name}`)
    o = d.replace(/<newline>/g, `\n`)
    let welembed = new Discord.MessageEmbed()
      .setTitle(`Welcome ${member.user.username}`)
      .setDescription(o)
      .setThumbnail(`${member.user.avatarURL()}`)
      .setColor('RANDOM')
      .setTimestamp(new Date());
    channel.send(welembed).catch(_ => { })
  }



  if (setting.has(`logging_${member.guild.id}`)) {
    let logch = setting.get(`logging_${member.guild.id}`, { target: ".logch" })
    let logsch = member.guild.channels.cache.find(channel => channel.id === logch)

    let eventembed = new Discord.MessageEmbed()
      .setAuthor("New Member", member.user.avatarURL())
      .addField("Username", `${member.user} - (${member.user.id})`, true)
      .addField("Account Creation", `${moment(member.user.createdAt).format("MMM Do YYYY")} - ${moment(member.user.createdAt).fromNow()}`)
      .setFooter("Azure Logs")
      .setThumbnail(member.user.avatarURL())
      .setTimestamp()
      .setColor("RANDOM")
    logsch.send(eventembed).catch(_ => { })
  }
}