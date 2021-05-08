const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, role) => {
    let setting = new db.table('guildSettings')
    if (setting.has(`logging_${role.guild.id}`)) {
        let logch = setting.get(`logging_${role.guild.id}`, { target: ".logch" })
        let logsch = role.guild.channels.cache.find(channel => channel.id === logch)

        let hoist;
        let mentionable;
        if (role.hoist === true) { hoist = "Yes" } else { hoist = "No" }
        if (role.mentionable === true) { mentionable = "Yes" } else { mentionable = "No" }

        let eventembed = new Discord.MessageEmbed()
            .setTitle("Role Created")
            .setDescription("Role Settings")
            .addField("Name", `${role} (${role.id})`)
            .addField("Colour", role.hexColor)
            .addField("Displayed Separately", hoist)
            .addField("Mentionable", mentionable)
            .setFooter("Azure Logs")
            .setTimestamp()
            .setThumbnail(role.guild.iconURL())
            .setColor("#007FFF")
            logsch.send(eventembed).catch(_ => { })
        return;
    }
}