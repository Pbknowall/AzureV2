const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = (bot, message, args) => {
    const setting = new db.table("guildSettings")

    let logstatus = ":red_square: `Disabled`"
    let filterstatus = ":red_square: `Disabled`"
    let linkstatus = ":red_square: `Disabled`"
    let joinstatus = ":red_square: `Disabled`"
    let leavestatus = ":red_square: `Disabled`"
    let lvlstatus = ":red_square: `Disabled`"

    if (setting.has(`logging_${message.guild.id}`)) {
        let logch;
        logch = message.guild.channels.cache.get(setting.get(`logging_${message.guild.id}.logch`))
        if(!logch) logch = `<#${setting.get(`logging_${message.guild.id}.logch`)}>`
        logstatus = `:green_square: \`Enabled\` - Channel: ${logch}`
    }
    if (setting.get(`filtering_${message.guild.id}`) === true) {
        filterstatus = `:green_square: \`Enabled\``
    }
    if (setting.get(`antiinvite_${message.guild.id}`) === true) {
        linkstatus = `:green_square: \`Enabled\``
    }
    if (setting.has(`joinlog_${message.guild.id}.joinch`)) {
        let joinmsg = setting.get(`joinlog_${message.guild.id}.joinmsg`)
        let joinch;
        joinch = message.guild.channels.cache.get(setting.get(`joinlog_${message.guild.id}.joinch`))
        if(!joinch) joinch = `<#${setting.get(`joinlog_${message.guild.id}.joinch`)}>`
        joinstatus = `:green_square: \`Enabled\` - "${joinmsg}" in ${joinch}`

    }
    if (setting.has(`joinlog_${message.guild.id}.leavech`)) {
        let leavemsg = setting.get(`joinlog_${message.guild.id}.leavemsg`)
        let leavech;
        leavech = message.guild.channels.cache.get(setting.get(`joinlog_${message.guild.id}.leavech`))
        if(!leavech) leavech = `<#${setting.get(`joinlog_${message.guild.id}.leavech`)}>`
        if (leavemsg && leavech) leavestatus = `:green_square: \`Enabled\` - "${leavemsg}" in ${leavech}`
    }
    if (setting.get(`levelling_${message.guild.id}`) === true) {
        lvlstatus = `:green_square: \`Enabled\``
    }

    let setembed = new Discord.MessageEmbed()
        .setTitle("Guild Settings")
        .setDescription("Change Settings with !!enable/disable")
        .addField("Logging", `${logstatus}\n\u200B\n`)
        .addField("Filtering", `${filterstatus}\n\u200B\n`)
        .addField("Anti-Invite-Link", `${linkstatus}\n\u200B\n`)
        .addField("Join Messages", `${joinstatus}\n\u200B\n`)
        .addField("Leave Messages", `${leavestatus}\n\u200B\n`)
        .addField("Leveling", `${lvlstatus}\n\u200B\n`)
        .setColor("#007FFF")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()

    message.channel.send(setembed)
}

module.exports.help = {
    name: "settings",
    description: "View the server's settings.",
    aliases: ["settings", "guildsettings", "logging", "sets"],
    category: "Logs"
}




/*guildSettings

(`logging_${message.guild.id}`, { logging: true, logch: channel.id })

(`antiinvite_${message.guild.id}`, { antiinvite: true })

(`joinlog_${message.guild.id}`, { joinch: "None Set", joinmsg: welcomemsg })*/