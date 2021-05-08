const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to manage member's warnings.");
    const set = new db.table("guildSettings")
    const usagembed = new Discord.MessageEmbed().setTitle("Warning Usage").setDescription("\`\`\`!!warn <member> <reason>\`\`\`\nExample: `!!warn @Pbknowall#7667 Spamming in chat`").setColor("#007FFF")
    if (!args[0] || !args[1]) return message.channel.send(usagembed)
    let offender = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0])
    if(!offender || offender.user.bot) return message.channel.send(usagembed)
    let reason = args.slice(1).join(" ")

    let warnedembed = new Discord.MessageEmbed()
        .setDescription(`❯ **Warn Info**`)
        .addField("Offender", offender.user.username, true)
        .addField("Moderator", message.author, true)
        .addField("Reason", reason, true)
        .addField("Time", moment(message.createdAt).format("MMMM Do YYYY, h:mm a"), true)
        .setColor("007FFF")
        .setTimestamp();
        let time = moment(message.createdAt).format("MMMM Do YYYY, h:mm a")
    if (!set.has(`warn1_${message.guild.id}_${offender.id}`)) {
        set.set(`warn1_${message.guild.id}_${offender.id}`, { moderator: message.author.id, reason: reason, time: time })
        warnedembed.setTitle("Warning 1")
        message.channel.send(warnedembed)
    } else if (set.has(`warn1_${message.guild.id}_${offender.id}`) && !set.has(`warn2_${message.guild.id}_${offender.id}`)) {
        set.set(`warn2_${message.guild.id}_${offender.id}`, { moderator: message.author.id, reason: reason, time: time })
        warnedembed.setTitle("Warning 2")
        message.channel.send(warnedembed)
    } else if (set.has(`warn1_${message.guild.id}_${offender.id}`) && set.has(`warn2_${message.guild.id}_${offender.id}`) && !set.has(`warn3_${message.guild.id}_${offender.id}`)) {
        set.set(`warn3_${message.guild.id}_${offender.id}`, { moderator: message.author.id, reason: reason, time: time })
        warnedembed.setTitle("Warning 3")
        message.channel.send(warnedembed)
    } else {
        message.channel.send("Max Amount of Warns Reached - 3 Warnings")
    }
}

module.exports.help = {
    name: "warn",
    description: "Warn someone in a server (Can be viewed with !!warnings)",
    aliases: ["warn", "warning"],
    category: "Mod"
}