const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to manage member's warnings.");
    const set = new db.table("guildSettings")
    let offender = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0])
    const usagembed = new Discord.MessageEmbed().setTitle("Warning Clear Usage").setDescription("\`\`\`!!clearwarns <member>\`\`\`\nExample: `!!clearwarns @Pbknowall#7667`\n(Note: This will clear all member's warnings in the server)").setColor("#007FFF")
    if (!args[0]) return message.channel.send(usagembed)

    
    if (set.has(`warn1_${message.guild.id}_${offender.id}`)) {
        set.delete(`warn1_${message.guild.id}_${offender.id}`)
    } else {
        return message.channel.send(offender + " has no warnings on record!")
    }
    if (set.has(`warn2_${message.guild.id}_${offender.id}`)) {
        set.delete(`warn2_${message.guild.id}_${offender.id}`)
    }
    if (set.has(`warn3_${message.guild.id}_${offender.id}`)) {
        set.delete(`warn3_${message.guild.id}_${offender.id}`)
    }

    let warnsembed = new Discord.MessageEmbed()
        .setAuthor("Warnings Cleared", offender.user.avatarURL())
        .setDescription("Warnings cleared successfully for member " + offender)
        .setColor("007FFF")
        .setTimestamp()

    message.channel.send(warnsembed)
}

module.exports.help = {
    name: "clearwarns",
    description: "Clear a member's warnings.",
    aliases: ["clearwarns", "clearwarn", "cwarn", "cwarns", "clearwarnings", "delwarns", "warningsdelete"],
    category: "Mod"
}