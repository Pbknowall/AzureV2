const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    let user;
    if (!args[0]) {
        user = message.author
    } else {
        user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user && message.guild.members.cache.find(m => m.user.username === args.join(" "))) {
            user = message.guild.members.cache.find(m => m.user.username === args.join(" ")).user
        } else if (!user) {
            user = message.author
        } else {
            user = user.user
        }
    }
    let avembed = new Discord.MessageEmbed()
        .setColor("#007FFF")
        .setAuthor(`${user.username}\'s Avatar`, user.displayAvatarURL())
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 2048 })}`)
        .setFooter("Mention a user to get their avatar.")
        .setTimestamp()

    message.channel.send(avembed);
}

module.exports.help = {
    name: "avatar",
    description: "Shows your/a user's avatar",
    aliases: ["avatar", "icon", "pfp"],
    category: "Info"
}