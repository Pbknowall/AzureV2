const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, channel) => {
    if (channel.type === "dm") return;
    const setting = new db.table("guildSettings")
    if (setting.has(`logging_${channel.guild.id}`)) {
        let logch = setting.get(`logging_${channel.guild.id}`, { target: ".logch" })
        let logsch = channel.guild.channels.cache.find(channel => channel.id === logch)

        let type;
        if (channel.type === "text") type = "#️⃣ Text"
        if (channel.type === "voice") type = "🔊 Voice"

        if (channel.type === "text" || channel.type === "voice") {
            let eventembed = new Discord.MessageEmbed()
                .setAuthor("Channel Deleted", channel.guild.iconURL())
                .setDescription(`**#${channel.name}**\nType: ${type}`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#FF0000")
            logsch.send(eventembed).catch(_ => { })
        } else if (channel.type === "category") {
            let eventembed = new Discord.MessageEmbed()
                .setAuthor("Category Deleted", channel.guild.iconURL())
                .setDescription(`📁 **${channel.name}**`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#FF0000")
            logsch.send(eventembed).catch(_ => { })
        }
    }
}