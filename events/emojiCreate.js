const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, emoji) => {
    const setting = new db.table("guildSettings")
    if (setting.has(`logging_${emoji.guild.id}`)) {
        let logch = setting.get(`logging_${emoji.guild.id}`, { target: ".logch" })
        let logsch = emoji.guild.channels.cache.find(channel => channel.id === logch)

        let eventembed = new Discord.MessageEmbed()
            .setAuthor(`Emoji Created : ":${emoji.name}:"`, emoji.url)
            .setImage(emoji.url)
            .setFooter("Azure Logs")
            .setTimestamp()
            .setColor("#007FFF")
            logsch.send(eventembed).catch(_ => { })
    }
}