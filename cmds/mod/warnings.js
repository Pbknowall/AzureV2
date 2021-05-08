const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to manage member's warnings.");
    const set = new db.table("guildSettings")
    let offender = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0])
    const usagembed = new Discord.MessageEmbed().setTitle("Warning Listing Usage").setDescription("\`\`\`!!warns <member>\`\`\`\nExample: `!!warns @Pbknowall#7667`").setColor("#007FFF")
    if (!args[0]) return message.channel.send(usagembed)

    let warnsembed = new Discord.MessageEmbed()
        .setColor("007FFF")
        .setTimestamp()


    if (!set.get(`warn1_${message.guild.id}_${offender.id}`)) {
        warnsembed.addField("❯ Warnings", "This member has no warnings on record!")
    }
    if (set.has(`warn1_${message.guild.id}_${offender.id}`)) {
        warnsembed.addField(`Warning 1 - "${set.get(`warn1_${message.guild.id}_${offender.id}.reason`)}"`, `Moderated by <@${set.get(`warn1_${message.guild.id}_${offender.id}.moderator`)}> on ${set.get(`warn1_${message.guild.id}_${offender.id}.time`)}`)
            .setAuthor(`❯ ${offender.user.username}\'s Warnings ( :one: )`)
    }
    if (set.has(`warn2_${message.guild.id}_${offender.id}`)) {
        warnsembed.addField(`Warning 2 - "${set.get(`warn2_${message.guild.id}_${offender.id}.reason`)}"`, `Moderated by <@${set.get(`warn2_${message.guild.id}_${offender.id}.moderator`)}> on ${set.get(`warn2_${message.guild.id}_${offender.id}.time`)}`)
            .setAuthor(`❯ ${offender.user.username}\'s Warnings ( :two: )`)
    }
    if (set.has(`warn3_${message.guild.id}_${offender.id}`)) {
        warnsembed.addField(`Warning 3 - "${set.get(`warn3_${message.guild.id}_${offender.id}.reason`)}"`, `Moderated by <@${set.get(`warn3_${message.guild.id}_${offender.id}.moderator`)}> on ${set.get(`warn3_${message.guild.id}_${offender.id}.time`)}`)
            .setAuthor(`❯ ${offender.user.username}\'s Warnings ( :three: )`)
    }

    message.channel.send(warnsembed)
}

module.exports.help = {
    name: "warnings",
    description: "View a member's warnings.",
    aliases: ["warns", "warnings"],
    category: "Mod"
}