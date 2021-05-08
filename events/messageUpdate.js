const Discord = require("discord.js")
const db = require("quick.db")

module.exports = (bot, oldMessage, newMessage) => {
    if(!newMessage.guild) return;
    let setting = new db.table('guildSettings')
    if (setting.has(`logging_${newMessage.guild.id}`)) {
        let logch = setting.get(`logging_${newMessage.guild.id}`, { target: ".logch" })
        let logsch = newMessage.guild.channels.cache.find(channel => channel.id === logch)

        if (oldMessage.author.bot) return;
        if (oldMessage === newMessage) return;
        if (oldMessage.content.includes("http")) return;
        if (newMessage.content.includes("http")) return;

        let eventembed = new Discord.MessageEmbed()
            .setAuthor("Message Edited", newMessage.author.avatarURL())
            .addField("Old Message", `\`\`\`${oldMessage}\`\`\`\n⬇️⬇️⬇️⬇️⬇️`)
            .addField("New Message", `\`\`\`${newMessage}\`\`\``)
            .setFooter("Azure Logs")
            .setThumbnail(newMessage.author.avatarURL())
            .setTimestamp()
            .setColor("#007FFF")
        logsch.send(eventembed).catch(_ => { })
        return;
    }
}