const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  const usagembed = new Discord.MessageEmbed().setTitle("Role Management Usage").setDescription("\`\`\`!!role <member> <role>\`\`\`\nExample: `!!role @Pbknowall#7667 @Member`").setTimestamp().setColor("#007FFF")
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to manage member's roles.")
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(mu => mu.user.username === args[0])
  let roleArg = args.slice(1).join(" ");
  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name == roleArg) || message.guild.roles.cache.get(roleArg)
  if (!member || !roleArg || !role) return message.channel.send(usagembed)

  if (!member.roles.cache.has(role.id)) {
    member.roles.add(role.id).then(() => {
      let embed1 = new Discord.MessageEmbed()
        .setDescription(`✅ Role ${role} was added to ${member}.`)
        .setColor('#7FFF00')
      message.channel.send(embed1)
    }).catch(() => {
      let permerror = new Discord.MessageEmbed().setDescription("❌ I couldn't perform this action - This is likely because I do not have sufficient permissions to add/remove roles.").setColor("#FF0000")
      message.channel.send(permerror)
    })

  } else if (member.roles.cache.has(role.id)) {
    member.roles.remove(role.id).then(() => {
      let embed2 = new Discord.MessageEmbed()
        .setDescription(`✅ Role ${role} was removed from ${member}`)
        .setColor('#7FFF00')
      message.channel.send(embed2)
    }).catch(() => {
      let permerror = new Discord.MessageEmbed().setDescription("❌ I couldn't perform this action - This is likely because I do not have sufficient permissions to add/remove roles.").setColor("#FF0000")
      message.channel.send(permerror)
    })

  } else {
    console.log("The \"else\" was triggered in !!role")
  }
}
module.exports.help = {
  name: "role",
  description: "Add a role to a user.",
  aliases: ["addrole", "role", "ar", "addrank", "rank", "removerole", "rr", "removerank", "derole", "derank"],
  category: "Mod"
}