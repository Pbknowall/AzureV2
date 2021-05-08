const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  const usagembed = new Discord.MessageEmbed().setTitle("Kick Usage").setDescription("\`\`\`!!kick <member>\n!!kick <member> <reason>\`\`\`\nExample: `!!kick @Pbknowall#7667 Spamming`").setTimestamp().setColor("#007FFF")
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to kick members.")
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])) || message.guild.members.cache.find(mu => mu.user.username === args[0])
  if (!kUser) return message.channel.send(usagembed);
  if (!kUser.kickable) return message.channel.send("That member can't be kicked!")
  let kReason = args.slice(1).join(" ")

  message.guild.member(kUser).kick(kReason)

  if (kReason) reason1 = `with reason **${kReason}**`
  if (!kReason) reason1 = "**without a reason**"

  message.channel.send(`**${kUser}** (${kUser.id}) was kicked ${reason1}`)

  const setting = new db.table("guildSettings")
  if (setting.has(`logging_${message.guild.id}`)) {
    let logch = setting.get(`logging_${message.guild.id}`, { target: ".logch" })
    let logsch = message.guild.channels.cache.find(channel => channel.id === logch)

    let kickEmbed = new Discord.MessageEmbed()
      .setTitle("Member Kicked")
      .setColor("#007FFF")
      .addField("Kicked User", `${kUser} (${kUser.id})`)
      .addField("Moderator", `${message.author} (${message.author.id})`)
      .addField("Reason", kReason)
    logsch.send(kickEmbed)
  }
}

module.exports.help = {
  name: "kick",
  description: "Kick a member from the server.",
  aliases: ["kick"],
  category: "Mod"
}