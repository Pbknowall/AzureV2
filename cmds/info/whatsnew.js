const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("What's New - Azure Version 2.1")
        .setDescription(`CHANGELOG - Azure V2.1 - August 23rd 2020`)
        .addField("\u200B\n-------- Azure v2.1 - August 23rd --------", `❯ Replaced \`!!set\` with \`!!enable\` and \`!!disable\`
        ❯ Added Message Filtering
        ❯ **Reaction Roles** - BETA - Report Bugs with \`!!bugreport\`
        ❯ General Bug Fixes
        \u200B`)
        .addField("-------- Azure v2.0 - August 1st --------", `❯ **COVID-19 Command for Daily & Weekly Death Counts + and Cases in Each Country**
        ❯ Updated All Commands to Djs V12
        ❯ Added New XP System
        ❯ Added New Fun Commands (meme, reddit, translate)
        ❯ Added **Logging, Anti-Invite-Link, Join + Leave Messages & Levelling Messages** (All togglable with with \`!!settings\`)
        ❯ Updated All Moderation Commands, and added some more including an improved Warning System
        ❯ ADDED MUSIC (+ Lyrics command)
        ❯ Updated All Commands Generally

        Use \`!!help\` to see all of the new commands!

        **Any Feedback or Bug Reports are extremely appreciated** - Use \`!!bugreport\`
        `)
        .setFooter("Azure")
        .setThumbnail(bot.user.avatarURL())
        .setTimestamp()
        .setColor("#007FFF")
    message.channel.send(embed)
}

module.exports.help = {
    name: "whatsnew",
    description: "View the additions in the newest update of Azure.",
    aliases: ["whatsnew", "new", "changelogs", "changes", "whatnew"],
    category: "Info"
}