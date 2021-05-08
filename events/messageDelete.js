const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, message) => {
    try {
        if (message.author.bot) return;
        const snipes = bot.snipes.get(message.channel.id) || [];
        snipes.unshift({
            content: message.content,
            author: message.author,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null,
            date: new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short" })
        })
        snipes.splice(10)
        bot.snipes.set(message.channel.id, snipes)
        let embed = new Discord.MessageEmbed()
            .setAuthor("Message Deletion", message.author.avatarURL())
            .setDescription(`**${message.author}'s Message was deleted in <#${message.channel.id}>**`)
            .addField("Content", message.content)
            .setFooter("Azure Logs - Message ID: " + message.id)
            .setTimestamp()
            .setColor("#FF0000");

        const setting = new db.table("guildSettings")
        if (setting.has(`logging_${message.guild.id}`)) {
            if(message.author.bot) return;
            let logch = setting.get(`logging_${message.guild.id}`, { target: ".logch" })
            let logsch = message.guild.channels.cache.find(channel => channel.id === logch)
            logsch.send(embed).catch(_ => { })
        }
    } catch (_) {
        return;
    }
}