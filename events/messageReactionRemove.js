const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    const setting = new db.table("guildSettings")
    const rr = setting.get(`rr_${reaction.message.guild.id}`)
    if (setting.has(`rr_${reaction.message.guild.id}.1.roles`)) {
        const items = []
        if (setting.get(`rr_${reaction.message.guild.id}.1`)) items.push(setting.get(`rr_${reaction.message.guild.id}.1`))
        if (setting.get(`rr_${reaction.message.guild.id}.2`)) items.push(setting.get(`rr_${reaction.message.guild.id}.2`))
        if (setting.get(`rr_${reaction.message.guild.id}.3`)) items.push(setting.get(`rr_${reaction.message.guild.id}.3`))
        if (setting.get(`rr_${reaction.message.guild.id}.4`)) items.push(setting.get(`rr_${reaction.message.guild.id}.4`))
        if (setting.get(`rr_${reaction.message.guild.id}.5`)) items.push(setting.get(`rr_${reaction.message.guild.id}.5`))
        const channels = []
        items.map(i => { if (i.channel === reaction.message.channel.id) channels.push({ "ch": i.channel, "id": i.id, "r": i.roles }) })
        channels.map(c => {
            const id = c.id
            const channel = reaction.message.guild.channels.cache.get(c.ch)
            if(!channel) return console.log("line 22 - no channel found")
            const msg = channel.messages.fetch(id).then(msg => {
                if (msg.id === reaction.message.id) {
                    const roles = c.r
                    let array = [];
                    roles.map(r => {
                        if (!isNaN(r.emote)) r.emote = reaction.message.guild.emojis.cache.get(r.emote).name
                        array.push(r.emote)
                    })
                    if (array.includes(reaction.emoji.name)) {
                        const index1 = array.indexOf(reaction.emoji.name)
                        const roleID = roles[index1].role
                        const role = reaction.message.guild.roles.cache.get(roleID)
                        const member = reaction.message.guild.members.fetch(user).then(member => {
                            member.roles.remove(role).catch(_ => { })
                        })
                    }
                }
            })
        })
    }
}