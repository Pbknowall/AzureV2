const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = (bot, message, args) => {
    if (!message.guild) return;
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command.")
    let usagembed = new Discord.MessageEmbed().setTitle("Setting Usage").setDescription("\`!!set <feature> <enabled/disabled>\`").setColor("#007FFF")
        .addField("Examples:", "\`!!set logging <channel>\`\n\`!!set antiinvite enabled\`\n\`!!set joinchannel <channel>\` -|- \`!!set joinmessage <message>\`\n(Use \`!!set joinmessage\` to see variables)")
    let logusagembed = new Discord.MessageEmbed().setTitle("Logging Settings Usage").setDescription("\`!!set logging <channel>\`\n\u200B\n**Logged Actions**:\n \`Channel Creation\`, \`Channel Deletion\`, \`Emoji Creation\`, \`Bans\`, \`Unbans\`, \`Member Join\`, \`Member Leave\`, \`Member Update\`, \`Message Edit\`, \`Message Delete\`, \`Message Bulk-Delete\`, \`Role Create\`, \`Role Delete\` and \`Role Update\`.").setColor("#007FFF").setFooter("Azure Logs").setTimestamp()
    let joinmsgembed = new Discord.MessageEmbed().setTitle("Join/Leave Message Settings - Usage").setDescription("**Variables:**\n\`<user>\` - Mentions the member who joined. (Won't notify)\n\`<username>\` - Shows the member's username without mentioning them.\n\`<membercount>\` - Shows the server's member count on the member's join.\n\`<server>\` - Show's the server name.\n\`<newline>\` - Adds a line break.\n\u200B\n!!set joinmsg <message>\n!!set leavemsg <message>").setColor("#007FFF")
    let joinchembed = new Discord.MessageEmbed().setTitle("Join/Leave Message Channel Settings - Usage").setDescription("\`!!set joinchannel <channel>\`").setColor("#007FFF")
    let lvlmsgembed = new Discord.MessageEmbed().setTitle("Levelling Messages - Usage").setDescription("`!!set lvlmsgs <enabled/disabled>`").setColor("#007FFF")
    if (!args[0] || args[0] === "help" || args[0] === "info") message.channel.send(usagembed)
    const setting = new db.table("guildSettings")





    if (args[0] === "logging" || args[0] === "log" || args[0] === "logs" || args[0] === "logch" || args[0] === "logchannel") {
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.delete(`logging_${message.guild.id}`)
            message.channel.send(":white_check_mark: Logging Channel Removed.")
            return;
        }
        let channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name === args[1])
        if (!channel) return message.channel.send(logusagembed)
        let mentionchannel = channel.toString()
        setting.set(`logging_${message.guild.id}`, { logging: true, logch: channel.id })
        message.channel.send(`:white_check_mark: Log Channel set to ${mentionchannel}`)
    }




    if (args[0] === "antilink" || args[0] === "antiinvite" || args[0] === "antinvite" || args[0] === "antiraid" || args[0] === "invite") {
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.delete(`antiinvite_${message.guild.id}`)
            message.channel.send(":white_check_mark: Anti-Invite Disabled")
            return;
        } else if (args[1] === "enable" || args[1] === "on" || args[1] === "true" || args[0] === "enabled") {
            setting.set(`antiinvite_${message.guild.id}`, { antiinvite: true })
            message.channel.send(`:white_check_mark: Anti-Invite Enabled.`);
        }
        if (!args[1]) {
            if (setting.has(`antiinvite_${message.guild.id}.antiinvite`)) {
                setting.delete(`antiinvite_${message.guild.id}`)
                message.channel.send(":white_check_mark: Anti-Invite Disabled")
            } else if (!setting.has(`antiinvite_${message.guild.id}.antiinvite`)) {
                setting.set(`antiinvite_${message.guild.id}`, { antiinvite: true })
                message.channel.send(":white_check_mark: Anti-Invite Enabled")

            }
        }
        return;
    }





    if (args[0] === "joinmsg" || args[0] === "joinmessage" || args[0] === "welmessage" || args[0] === "welmsg" || args[0] === "welcomemessage" || args[0] === "welcomemsg") {
        if (!args[1]) return message.channel.send(joinmsgembed)
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.delete(`joinlog_${message.guild.id}.joinmsg`)
            message.channel.send(":white_check_mark: Join Message Deleted.")
            return;
        } else {
            let welcomemsg = args.slice(1).join(" ")
            if (setting.get(`joinlog_${message.guild.id}.joinch`) === undefined || !setting.has(`joinlog_${message.guild.id}.joinch`)) {
                setting.set(`joinlog_${message.guild.id}`, { joinch: "None Set", joinmsg: welcomemsg })
            } else {
                setting.set(`joinlog_${message.guild.id}.joinmsg`, welcomemsg)
            }
            message.channel.send(`:white_check_mark: Join Message Set:\n\`${args.slice(1).join(" ")}\`\nOn a member's join the provided variables will be automatically replaced by their function.`)
        }

    }



    if (args[0] === "leavemsg" || args[0] === "leavemessage") {
        if (!args[1]) return message.channel.send(joinmsgembed)
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.delete(`joinlog_${message.guild.id}.leavemsg`)
            message.channel.send(":white_check_mark: Leave Message Deleted.")
            return;
        } else {
            let byemsg = args.slice(1).join(" ")
            setting.set(`joinlog_${message.guild.id}.leavemsg`, byemsg)

            message.channel.send(`:white_check_mark: Leave Message Set:\n\`${args.slice(1).join(" ")}\`\nOn a member's leave the provided variables will be automatically replaced by their function.`)
        }

    }



    if (args[0] === "joinch" || args[0] === "joinchannel" || args[0] === "leavechannel" || args[0] === "leavech") {
        if (!args[1]) return message.channel.send(joinchembed)
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.delete(`joinlog_${message.guild.id}.joinch`)
            message.channel.send(":white_check_mark: Join/Leave Message Channel Deleted.")
            return;
        } else {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name === args[1])
            if (!channel) return message.channel.send(logusagembed)
            let mentionchannel = channel.toString()
            if (setting.get(`joinlog_${message.guild.id}.joinmsg`) === undefined || !setting.has(`joinlog_${message.guild.id}.joinmsg`)) {
                setting.set(`joinlog_${message.guild.id}`, { joinch: channel.id, joinmsg: "Welcome <username>\!", leavemsg: "Bye <username>\!" })
            } else {
                setting.set(`joinlog_${message.guild.id}.joinch`, channel.id)
            }
            message.channel.send(`:white_check_mark: Set join logs channel to ` + mentionchannel)
        }
    }


    if (args[0] === "levelup" || args[0] === "levelupmsgs" || args[0] === "lvlmessages" || args[0] === "lvlupmessages" || args[0] === "lvlmsgs") {
        if (!args[1]) return message.channel.send(lvlmsgembed)
        if (args[1] === "delete" || args[1] === "disable" || args[1] === "remove" || args[1] === "disabled" || args[1] === "del" || args[1] === "off" || args[1] === "false") {
            setting.set(`lvlmsgs_${message.guild.id}.lvlmsgs`, false)
            message.channel.send(":white_check_mark: Level Messages Disabled.")
        } else {
            setting.set(`lvlmsgs_${message.guild.id}.lvlmsgs`, true)
            message.channel.send(`:white_check_mark: Level Messages Enabled.`)
        }
    }

}

module.exports.help = {
    name: "set",
    description: "Enable/Disable Guild Settings",
    aliases: ["set"],
    category: "Logs"
}