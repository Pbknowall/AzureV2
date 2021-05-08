const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  const usagembed = new Discord.MessageEmbed().setTitle("Ban Usage").setDescription("\`\`\`!!ban <member>\n!!ban <member> <reason>\`\`\`\nExample: `!!ban @Pbknowall#7667 Advertising`").setTimestamp().setColor("#007FFF")
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban members.")
  let memberToBan = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])) || message.guild.members.cache.find(mu => mu.user.username === args[0])
  if(!memberToBan) return message.channel.send(usagembed)
  if(!memberToBan.bannable) return message.channel.send("That member can't be banned!")
  let reason = args.slice(1).join(" ")

  memberToBan.ban({ reason: reason }).catch(error => message.reply("It appears there was an error:\n" + error + " \nPlease report using !!bugreport"))

  if (reason) reason1 = `with reason **${reason}**`
  if (!reason) reason1 = "**without a reason**"; if(!reason) reason = "No Reason Provided"

  message.channel.send(`**${memberToBan}** (${memberToBan.id}) was banned ${reason1}`)

  const setting = new db.table("guildSettings")
  if (setting.has(`logging_${message.guild.id}`)) {
    let logch = setting.get(`logging_${message.guild.id}`, { target: ".logch" })
    let logsch = message.guild.channels.cache.find(channel => channel.id === logch)

    let banEmbed = new Discord.MessageEmbed()
      .setTitle("Member Banned")
      .setColor("#007FFF")
      .addField("Banned User", `${memberToBan} (${memberToBan.id})`)
      .addField("Moderator", `${message.author} (${message.author.id})`)
      .addField("Reason", reason)
    logsch.send(banEmbed)
  }
}

module.exports.help = {
  name: "ban",
  description: "Ban a member from the server.",
  aliases: ["ban"],
  category: "Mod"
}