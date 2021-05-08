const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, oldUser, newUser) => {
    const setting = new db.table("guildSettings")
    let mutualid;
    let mutualserver;
    bot.guilds.cache.forEach(s => {
        if (s.members.cache.get(newUser.id)) { mutualid = s.id; mutualserver = s }
    })
    if (setting.has(`logging_${mutualid}`)) {
        let logch = setting.get(`logging_${mutualid}`, { target: ".logch" })
        let logsch = mutualserver.channels.cache.find(channel => channel.id === logch)

        if (oldUser.username !== newUser.username) {
            let olduembed = new Discord.MessageEmbed()
                .setTitle("User Updated")
                .setDescription(`${newUser}'s Username changed from **${oldUser.username}** to **${newUser.username}**.`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
                .setThumbnail(oldUser.avatarURL())
            logsch.send(olduembed).catch(_ => { })
        } else  if (oldUser.avatarURL() !== newUser.avatarURL()) {
            let oldembed = new Discord.MessageEmbed()
                .setAuthor("Old Avatar", oldUser.avatarURL())
                .setDescription(`${newUser}'s Avatar changed. ⬇️`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
                .setThumbnail(oldUser.avatarURL())
            let newembed = new Discord.MessageEmbed()
                .setAuthor("New Avatar", newUser.avatarURL())
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
                .setThumbnail(newUser.avatarURL())
            logsch.send(oldembed).catch(_ => { })
            logsch.send(newembed).catch(_ => { })
        }
    }
}