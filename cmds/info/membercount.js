const Discord = require('discord.js');

module.exports.run = (bot, message, args, tools) => {

    const embed = new Discord.MessageEmbed()
        .setTitle("Member Status")
        .setColor("#007FFF")
        .setThumbnail(message.guild.iconURL())
        .addField('Members', `**${message.guild.memberCount}**`, true)
        //.addField("\u200B", "\u200B")
        .addField('Humans', `**${message.guild.members.cache.filter(member => !member.user.bot).size}**`, true)
        //.addField("\u200B", "\u200B")
        .addField('Bots', `**${message.guild.members.cache.filter(member => member.user.bot).size}**`, true)
        .addField('Member Status', `**${message.guild.members.cache.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.cache.filter(off => off.presence.status === 'offline').size}** Offline/Invisible\n**${message.guild.members.cache.filter(s => s.presence.status === 'streaming').size}** Streaming`)
        .setFooter(`Owner: ${message.guild.owner.user.tag}`)
        .setAuthor(message.guild.name)

    message.channel.send(embed);
};

module.exports.help = {
    name: "membercount",
    description: "Displays member and bot count.",
    aliases: ["membercount", "members", "users"],
    category: "Info"
}