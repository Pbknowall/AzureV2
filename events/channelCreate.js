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
                .setAuthor("Channel Created", channel.guild.iconURL())
                .setDescription(`${channel}\nType: ${type}`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
            logsch.send(eventembed)
        } else if (channel.type === "category") {
            let eventembed = new Discord.MessageEmbed()
                .setAuthor("Category Created", channel.guild.iconURL())
                .setDescription(`📁 **${channel.name}**`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
            logsch.send(eventembed).catch(_ => { })
        }

    }
}

