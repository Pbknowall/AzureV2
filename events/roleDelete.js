const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, role) => {
    let setting = new db.table('guildSettings')
    if (setting.has(`logging_${role.guild.id}`)) {
        let logch = setting.get(`logging_${role.guild.id}`, { target: ".logch" })
        let logsch = role.guild.channels.cache.find(channel => channel.id === logch)

        let eventembed = new Discord.MessageEmbed()
            .setTitle("Role Deleted")
            .setDescription(`Name: ${role.name} (${role.id})`)
            .setFooter("Azure Logs")
            .setTimestamp()
            .setThumbnail(role.guild.iconURL())
            .setColor("#FF0000")
            logsch.send(eventembed).catch(_ => { })
        return;
    }
}