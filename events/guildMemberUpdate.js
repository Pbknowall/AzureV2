const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, oldMember, newMember) => {
    const setting = new db.table("guildSettings")
    if (setting.has(`logging_${newMember.guild.id}`)) {
        let logch = setting.get(`logging_${newMember.guild.id}`, { target: ".logch" })
        let logsch = newMember.guild.channels.cache.find(channel => channel.id === logch)

        if (oldMember.nickname !== newMember.nickname) {
            if (oldMember.nickname === null) oldMember.nickname = oldMember.user.username
            if (newMember.nickname === null) newMember.nickname = newMember.user.username
            if (oldMember.nickname === newMember.nickname) return;
            let nickembed = new Discord.MessageEmbed()
                .setAuthor("Nickname Changed", oldMember.user.avatarURL())
                .setDescription(`${newMember}'s Nickname was changed from **${oldMember.nickname}** to **${newMember.nickname}**.`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
                .setThumbnail(newMember.user.avatarURL())
            logsch.send(nickembed).catch(_ => { })
        } else if (oldMember.roles.cache.difference(newMember.roles.cache)) {
            let a = "given to"
            let b = "Role Added"
            let role = oldMember.roles.cache.difference(newMember.roles.cache).first()
            if(!role) return;
            if (!newMember.roles.cache.has(role.id)) { a = "removed from"; b = "Role Removed" }
            let roleembed = new Discord.MessageEmbed()
                .setAuthor(b, newMember.user.avatarURL())
                .setDescription(`${oldMember.roles.cache.difference(newMember.roles.cache).map(r => `${r}`)} was ${a} ${newMember}`)
                .setFooter("Azure Logs")
                .setTimestamp()
                .setColor("#007FFF")
                .setThumbnail(newMember.user.avatarURL())
            logsch.send(roleembed).catch(_ => { })
            return;
        }
    }
}