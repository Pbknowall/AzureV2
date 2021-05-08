const Discord = require("discord.js")
const db = require("quick.db")
const setting = new db.table("guildSettings")

//Logged Actions:\n \`Channel Creation\`, \`Channel Deletion\`, \`Emoji Creation\`, \`Bans\`, \`Unbans\`, \`Member Join\`, \`Member Leave\`, \`Member Update\`, \`Message Edit\`, \`Message Delete\`, \`Message-Bulk-Delete\`, \`Role Create\`, \`Role Delete\` and \`Role Update\`."

module.exports.run = async (bot, message, args) => {
    const logging = ["logging", "logs", "log", "audit", "auditlog", "audit log"]
    const levelling = ["leveling", "levels", "level", "lvling", "lvlling", "lvls", "lvl", "ranking"]
    const joinmsgs = ["joinmsgs", "joinmessages", "welcomemessages", "welcomemsgs", "join msgs", "join messages", "welcome messages", "welcomemsgs"]
    const leavemsgs = ["leavemsgs", "leavemessages", "leave msgs", "leave messages"]
    const antiinvite = ["antiinvite", "antinvite", "antiinvitelink", "antinvitelink", "anti invite", "anti invite link"]
    const badwordfilter = ["filter", "filtering", "bad-word filtering", "bad word filtering", "badwordfiltering"]

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command.")

    let usage = new Discord.MessageEmbed().setTitle("Feature Enabling").setDescription("!!enable <feature>").setColor("#007FFF").addField("Examples:", "\`!!enable logging\`\n\`!!enable filtering\`\n\`!!enable antiinvite\`\n\`!!enable joinmessages\`\n\`!!enable leavemessages\`\n\`!!enable levelling\`\n\u200B\nAfter running a command Azure will open a prompt for further configuration.")
    let logsusage = new Discord.MessageEmbed()
        .setTitle("Enable Logging")
        .setDescription("\`!!enable logging\`\n\u200B\nLogged Actions:\n \`Channel Creation\`, \`Channel Deletion\`, \`Emoji Creation\`, \`Bans\`, \`Unbans\`, \`Member Join\`, \`Member Leave\`, \`Member Update\`, \`Message Edit\`, \`Message Delete\`, \`Message-Bulk-Delete\`, \`Role Create\`, \`Role Delete\` and \`Role Update\`.")
        .setColor("#007FFF")
        .setFooter("Azure Logs")
        .setTimestamp()

    if (!args[0]) return message.channel.send(usage)
    const prompter = message.author

    if (logging.includes(args.join(" ").toLowerCase())) {
        const logprompt = new Discord.MessageEmbed()
            .setTitle("Logging")
            .setDescription("**Please choose a channel where you would like logs to be sent to.**")
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 15 seconds.")
            .setColor("#007FFF")
        message.channel.send(logprompt)
        const prompt = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 15000 })
            .then(m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const channel = m.mentions.channels.first() || m.guild.channels.cache.find(ch => ch.name === m.content) || m.guild.channels.cache.get(m.content)
                if (channel) {
                    const embed = new Discord.MessageEmbed().setDescription(`✅ Logs Channel Set to ${channel}`).setColor("#007FFF")
                    message.channel.send(embed)
                    setting.set(`logging_${message.guild.id}.logch`, channel.id)
                } else message.channel.send("Channel Not Found - Prompt Cancelled")
            }).catch(err => {
                message.channel.send("Prompt Cancelled")
            })
    }


    if (levelling.includes(args.join(" ").toLowerCase())) {
        if (setting.get(`levelling_${message.guild.id}`) === true) return message.channel.send("❌ Leveling is Already Enabled!")
        const embed = new Discord.MessageEmbed().setDescription(`✅ Leveling Enabled`).setColor("#007FFF")
        message.channel.send(embed)
        setting.set(`levelling_${message.guild.id}`, true)
        console.log("Levelling: " + setting.get(`levelling_${message.guild.id}`))
    }





    if (joinmsgs.includes(args.join(" ").toLowerCase())) {
        const logprompt = new Discord.MessageEmbed()
            .setTitle("Welcome Messages | Channel")
            .setDescription("**Please choose a channel where you would like welcome messages to be sent to.**")
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 15 seconds.")
            .setColor("#007FFF")
        message.channel.send(logprompt)
        const prompt = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 15000 })
            .then(async m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const channel = m.mentions.channels.first() || m.guild.channels.cache.find(ch => ch.name === m.content) || m.guild.channels.cache.get(m.content)
                if (channel) {
                } else message.channel.send("Channel Not Found - Prompt Cancelled")

                const logprompt2 = new Discord.MessageEmbed()
                    .setTitle("Welcome Messages | Message")
                    .setDescription("**Now, input a message you want to be sent on a user's join.**\n\u200B\n**Variables:**\n\`<user>\` - Mentions the member who joined. (Won't notify)\n\`<username>\` - Shows the member's username without mentioning them.\n\`<membercount>\` - Shows the server's member count on the member's join.\n\`<server>\` - Show's the server name.\n\`<newline>\` - Adds a line break.\n\u200B\nType `default` to use the default join message (\"Welcome <user>!\") or `cancel` to cancel this prompt.")
                    .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 30 seconds.")
                    .setColor("#007FFF")
                message.channel.send(logprompt2)
                const prompt2 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 30000 })
                    .then(m => {
                        m = m.first()
                        if (m.author.id !== prompter.id) return;
                        let msg;
                        if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") {
                            return message.channel.send("Prompt Cancelled")
                        } else if (m.content === "default" || m.content === "Default" || m.content === "DEFAULT") {
                            msg = "Welcome <user>!"
                        } else {
                            msg = m.content
                        }
                        if (msg) {
                            const embed = new Discord.MessageEmbed().setDescription(`✅ **Welcome Message Set to**: "${msg}" in ${channel}\n\nYou can also add Leave Messages with \`!!enable leave messages\``).setColor("#007FFF")
                            setting.set(`joinlog_${message.guild.id}.joinmsg`, msg)
                            setting.set(`joinlog_${message.guild.id}.joinch`, channel.id)
                            message.channel.send(embed)
                        }
                    }).catch(err => {
                        message.channel.send("Prompt Cancelled")
                    })
            }).catch(err => {
                message.channel.send("Prompt Cancelled")
            })
    }




    if (leavemsgs.includes(args.join(" ").toLowerCase())) {
        const logprompt = new Discord.MessageEmbed()
            .setTitle("Leave Messages | Channel")
            .setDescription("**Please choose a channel where you would like leave messages to be sent to.**")
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 15 seconds.")
            .setColor("#007FFF")
        message.channel.send(logprompt)
        const prompt = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 15000 })
            .then(async m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const channel = m.mentions.channels.first() || m.guild.channels.cache.find(ch => ch.name === m.content) || m.guild.channels.cache.get(m.content)
                if (channel) {
                } else message.channel.send("Channel Not Found - Prompt Cancelled")

                const logprompt2 = new Discord.MessageEmbed()
                    .setTitle("Leave Messages | Message")
                    .setDescription("**Now, input a message you want to be sent on a user's departure.**\n\u200B\n**Variables:**\n\`<user>\` - Mentions the member who left. (Won't notify)\n\`<username>\` - Shows the member's username without mentioning them.\n\`<membercount>\` - Shows the server's member count after the member's departure.\n\`<server>\` - Show's the server name.\n\`<newline>\` - Adds a line break.\n\u200B\nType `default` to use the default leave message (\"Cya <user>!\") or `cancel` to cancel this prompt.")
                    .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 30 seconds.")
                    .setColor("#007FFF")
                message.channel.send(logprompt2)
                const prompt2 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 30000 })
                    .then(m => {
                        m = m.first()
                        if (m.author.id !== prompter.id) return;
                        let msg;
                        if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") {
                            return message.channel.send("Prompt Cancelled")
                        } else if (m.content === "default" || m.content === "Default" || m.content === "DEFAULT") {
                            msg = "Cya <user>!"
                        } else {
                            msg = m.content
                        }
                        if (msg) {
                            const embed = new Discord.MessageEmbed().setDescription(`✅ **Leave Message Set to**: "${msg}" in ${channel}\n\nYou can also add Join Messages with \`!!enable join messages\``).setColor("#007FFF")
                            setting.set(`joinlog_${message.guild.id}.leavemsg`, msg)
                            setting.set(`joinlog_${message.guild.id}.leavech`, channel.id)
                            console.log(setting.get(`joinlog_${message.guild.id}`))
                            message.channel.send(embed)
                        }
                    }).catch(err => {
                        message.channel.send("Prompt Cancelled")
                    })
            }).catch(err => {
                message.channel.send("Prompt Cancelled")
            })
    }


    if (antiinvite.includes(args.join(" ").toLowerCase())) {
        if (setting.get(`antiinvite_${message.guild.id}`) === true) return message.channel.send("❌ Anti-Invite is Already Enabled!")
        const embed = new Discord.MessageEmbed().setDescription(`✅ Anti-Invite Enabled`).setColor("#007FFF")
        message.channel.send(embed)
        setting.set(`antiinvite_${message.guild.id}`, true)
    }

    if (badwordfilter.includes(args.join(" ").toLowerCase())) {
        if (setting.get(`filtering_${message.guild.id}`) === true) return message.channel.send("❌ Filtering is Already Enabled!")
        const embed = new Discord.MessageEmbed().setDescription(`✅ Filtering Enabled`).setColor("#007FFF")
        message.channel.send(embed)
        setting.set(`filtering_${message.guild.id}`, true)
    }



}

module.exports.help = {
    name: "enable",
    description: "Enable extra features.",
    aliases: ["enable"],
    category: "Logs"
}