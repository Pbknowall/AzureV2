const Discord = require("discord.js")
const db = require("quick.db")
const setting = new db.table("guildSettings")

module.exports.run = async (bot, message, args) => {
    const logging = ["logging", "logs", "log", "audit", "auditlog", "audit log"]
    const levelling = ["leveling", "levels", "level", "lvling", "lvlling", "lvls", "lvl", "ranking"]
    const joinmsgs = ["joinmsgs", "joinmessages", "welcomemessages", "welcomemsgs", "join msgs", "join messages", "welcome messages", "welcomemsgs"]
    const leavemsgs = ["leavemsgs", "leavemessages", "leave msgs", "leave messages"]
    const antiinvite = ["antiinvite", "antinvite", "antiinvitelink", "antinvitelink", "anti invite", "anti invite link"]
    const badwordfilter = ["filter", "filtering", "bad-word filtering", "bad word filtering", "badwordfiltering"]

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command.")

    let usage = new Discord.MessageEmbed().setTitle("Feature Disabling").setDescription("!!disable <feature>").setColor("#007FFF").addField("Examples:", "\`!!disable logging\`\n\`!!disable filtering\´\n\`!!disable antiinvite\`\n\`!!disable joinmessages\`\n\`!!disable leavemessages\`\n\`!!disable levelling\`")
    let logsusage = new Discord.MessageEmbed()
        .setTitle("Disable Logging")
        .setDescription("\`!!disable logging\`\n\u200B\nLogged Actions:\n \`Channel Creation\`, \`Channel Deletion\`, \`Emoji Creation\`, \`Bans\`, \`Unbans\`, \`Member Join\`, \`Member Leave\`, \`Member Update\`, \`Message Edit\`, \`Message Delete\`, \`Message-Bulk-Delete\`, \`Role Create\`, \`Role Delete\` and \`Role Update\`.")
        .setColor("#007FFF")
        .setFooter("Azure Logs")
        .setTimestamp()

    if (!args[0]) { return message.channel.send(usage) }

    else if (logging.includes(args.join(" ").toLowerCase())) {
        if (!setting.has(`logging_${message.guild.id}`)) return message.channel.send("❌ Logging is Already Disabled!")
        setting.delete(`logging_${message.guild.id}`)
        const embed = new Discord.MessageEmbed().setDescription(`✅ Logging Disabled`).setColor("#007FFF")
        message.channel.send(embed)

    } else if (levelling.includes(args.join(" ").toLowerCase())) {
        if (!setting.has(`levelling_${message.guild.id}`)) return message.channel.send("❌ Levelling is Already Disabled!")
        setting.delete(`levelling_${message.guild.id}`)
        const embed = new Discord.MessageEmbed().setDescription(`✅ Levelling Disabled`).setColor("#007FFF")
        message.channel.send(embed)

    } else if (joinmsgs.includes(args.join(" ").toLowerCase())) {
        if(!setting.has(`joinlog_${message.guild.id}.joinch`)) return message.channel.send("❌ Join Messages are Already Disabled!")
        setting.delete(`joinlog_${message.guild.id}.joinmsg`)
        setting.delete(`joinlog_${message.guild.id}.joinch`)
        const embed = new Discord.MessageEmbed().setDescription("✅ Welcome Messages Disabled").setColor("#007FFF")
        message.channel.send(embed)

    } else if (leavemsgs.includes(args.join(" ").toLowerCase())) {
        if(!setting.has(`joinlog_${message.guild.id}.leavech`)) return message.channel.send("❌ Leave Messages are Already Disabled!")
        setting.delete(`joinlog_${message.guild.id}.leavemsg`)
        setting.delete(`joinlog_${message.guild.id}.leavech`)
        const embed = new Discord.MessageEmbed().setDescription(`✅ Leave Messages Disabled`).setColor("#007FFF")
        message.channel.send(embed)

    } else if (antiinvite.includes(args.join(" ").toLowerCase())) {
        if (!setting.get(`antiinvite_${message.guild.id}`)) return message.channel.send("❌ Anti-Invite is Already Disabled!")
        setting.delete(`antiinvite_${message.guild.id}`)
        const embed = new Discord.MessageEmbed().setDescription(`✅ Anti-Invite Disabled`).setColor("#007FFF")
        message.channel.send(embed)
    } else if (badwordfilter.includes(args.join(" ").toLowerCase())) {
        if (!setting.get(`filtering_${message.guild.id}`)) return message.channel.send("❌ Filtering is Already Disabled!")
        setting.delete(`filtering_${message.guild.id}`)
        const embed = new Discord.MessageEmbed().setDescription(`✅ Filtering Disabled`).setColor("#007FFF")
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "disable",
    description: "Disable extra features.",
    aliases: ["disable"],
    category: "Logs"
}