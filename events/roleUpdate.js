const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, oldRole, newRole) => {
    let setting = new db.table('guildSettings')
    if (setting.has(`logging_${newRole.guild.id}`)) {
        let logch = setting.get(`logging_${newRole.guild.id}`, { target: ".logch" })
        let logsch = newRole.guild.channels.cache.find(channel => channel.id === logch)


        if (oldRole.name !== newRole.name) {
            let namechange = new Discord.MessageEmbed()
            .setTitle("Role Updated:")
            .addField("Old Name", oldRole.name, true)
            .addField("New Name", newRole.name, true)
            .setColor(newRole.hexColor)
            .setDescription(`Role ${newRole} Modified`)
            .setFooter("Azure Logs")
            .setTimestamp()
            logsch.send(namechange).catch(_ => { })
        }
        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            let permchange = new Discord.MessageEmbed()
            .setTitle("Role Updated:")
            .addField("Old Permission Bitfield", oldRole.permissions.bitfield, true)
            .addField("New Permission Bitfield", newRole.permissions.bitfield, true)
            .setColor(newRole.hexColor)
            .setDescription(`Role ${newRole} Modified`)
            .setFooter("Azure Logs")
            .setTimestamp()
            logsch.send(permchange).catch(_ => { })
        }
        if (oldRole.hexColor !== newRole.hexColor) {
            let colourchange = new Discord.MessageEmbed()
            .setTitle("Role Updated:")
            .addField("Old Colour", oldRole.hexColor, true)
            .addField("New Colour", newRole.hexColor, true)
            .setColor(newRole.hexColor)
            .setDescription(`Role ${newRole} Modified`)
            .setFooter("Azure Logs")
            .setTimestamp()
            logsch.send(colourchange).catch(_ => { })
        }
        return;
    }
}