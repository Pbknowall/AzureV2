const Discord = require('discord.js');
const db = require("quick.db")
const guildset = new db.table("guildSettings")

module.exports.run = (bot, message, args) => {
  if (!args[0]) {
    let prefix;
    if (guildset.has(`prefix_${message.guild.id}.prefix`)) {
      prefix = guildset.get(`prefix_${message.guild.id}.prefix`)
    } else {
      prefix = "!!"
    }
    const covid = bot.commands.filter(command => command.help.category == "covid")

    const mod = bot.commands.filter(command => command.help.category == "Mod")
    const info = bot.commands.filter(command => command.help.category == "Info")
    const fun = bot.commands.filter(command => command.help.category == "Fun")
    const log = bot.commands.filter(command => command.help.category == "Logs")
    const music = bot.commands.filter(command => command.help.category == "Music")
    let helpembed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .setURL("https://azure.hussx.xyz/commands")
      .setDescription(`**${bot.commands.size}** Available Commands in [Azure](https://azure.hussx.xyz)\n\nMy prefix in this server is \`${prefix}\`\nUse \`${prefix}<command>\` or \`@Azure#6445 <command>\` to get more information on an individual command.\n\n**UPDATE**: v2.1 - View \`!!whatsnew\` For Details\n\u200B`)

      .addField(`🦠COVID-19 STATISTICS🦠 (${covid.size})`, covid.map(c => `\`${c.help.name}\``).join(", "))

      .addField(`Moderation (${mod.size})`, mod.map(c => `\`${c.help.name}\``).join(", "))
      .addField(`Informational (${info.size})`, info.map(c => `\`${c.help.name}\``).join(", "))
      .addField(`Fun (${fun.size})`, fun.map(c => `\`${c.help.name}\``).join(", "))
      .addField(`Logging (${log.size})`, log.map(c => `\`${c.help.name}\``).join(", "))
      .addField(`Music (${music.size})`, music.map(c => `\`${c.help.name}\``).join(", "))
      .setFooter("Azure V2")
      .setThumbnail(bot.user.avatarURL())
      .setTimestamp()
      .setColor("007FFF", bot.user.avatarURL())
    message.channel.send(helpembed)
  } else if (args[0]) {
    let commandName = args[0]
    let match = bot.commands.filter(cmd => cmd.help.aliases.includes(commandName)).first() || bot.commands.filter(cmd => cmd.help.name === commandName).first()
    if (!match) {
      const usageEmbed = new Discord.MessageEmbed()
        .setTitle("Command Help Usage")
        .setDescription("```!!help <command>```")
        .setTimestamp()
        .setColor("#007FFF")
      return message.channel.send(usageEmbed)
    } else {
      let name = match.help.name.charAt(0).toUpperCase() + match.help.name.slice(1)
      const embed = new Discord.MessageEmbed()
        .setTitle(`"${name}" Usage`)
        .setDescription(`**Name**: \`${match.help.name}\`\n**Description**: ${match.help.description}\n**Category**: ${match.help.category}\n**Aliases**: ${match.help.aliases.map(a => `\`${a}\``).join(", ")}`)
        .setTimestamp()
        .setColor("#007FFF")
      message.channel.send(embed)
    }
  }
}
module.exports.help = {
  name: 'help',
  description: 'Get information on available commands.',
  aliases: ['help', 'cmds', 'commands', "usage", "desc"],
  category: "Info"
}