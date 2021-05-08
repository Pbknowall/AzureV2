const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let msg = new Discord.MessageEmbed()
    .setTitle('Azure')
    .setURL("http://azure.hussx.xyz/")
    .setDescription(`❯ [Invite](http://azure.hussx.xyz/invite)
❯ [Website](http://azure.hussx.xyz/)
❯ [Commands](http://azure.hussx.xyz/commands)`)
    .setColor("#007FFF")
    .setThumbnail(bot.user.avatarURL())
    .setFooter("Requested by " + message.author.tag)
    .setTimestamp()

  message.channel.send(msg)
}

module.exports.help = {
  name: 'invite',
  description: 'Sends a DM to the user containing a link to add the bot.',
  aliases: ["invite", "add"],
  category: "Info"
}