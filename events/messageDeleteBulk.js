const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, message) => {
    let msg;
    let m = message.map(m => msg = m)
    let setting = new db.table('guildSettings')
    if (setting.has(`logging_${msg.guild.id}`)) {
        let logch = setting.get(`logging_${msg.guild.id}`, { target: ".logch" })
        let logsch = msg.guild.channels.cache.find(channel => channel.id === logch)
        let messagesmapped = message.map(m => `Message ${m},\n`)
        let eventembed = new Discord.MessageEmbed()
            .setAuthor("Message Bulk-Delete (Purge)")
            .setDescription(`**${messagesmapped.length}** Messages Deleted in ${msg.channel}`)
            .setFooter("Azure Logs")
            .setTimestamp()
            .setColor("#007FFF")
        logsch.send(eventembed).catch(_ => { })
    }
}