const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, guild, user) => {
    const setting = new db.table("guildSettings")
    if (setting.has(`logging_${guild.id}`)) {
        let logch = setting.get(`logging_${guild.id}`, { target: ".logch" })
        let logsch = guild.channels.cache.find(channel => channel.id === logch)

        let eventembed = new Discord.MessageEmbed()
            .setAuthor("Member Banned", user.avatarURL())
            .addField("New Ban", `${user} - **${user.tag}**\n(${user.id})`)
            .setFooter("Azure Logs")
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .setColor("#007FFF")
        logsch.send(eventembed).catch(_ => { })
    }
}