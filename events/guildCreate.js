const Discord = require("discord.js")

module.exports = async (bot, guild) => {
    const me = await guild.members.fetch(bot.user.id)
    let channel = guild.channels.cache.find(g => g.name === "general") || guild.channels.cache.filter(c => c.permissionsFor(me).has('SEND_MESSAGES') && c.type === 'text').first()
    if (!channel) channel = guild.owner
    console.log("Azure just joined \"" + guild.name + "\" and settled in: #" + channel.name)
    let joinembed = new Discord.MessageEmbed()
        .setTitle("Thank You For Inviting Me To Your Server!", guild.iconURL())
        .setDescription(`\u200B\n:o: Use **!!help** to see my available commands;\n:o: View server settings with **!!settings**\n:o: All features are disabled by default.\n:o: Use **!!suggest** to suggest new features - Greatly Appreciated!\n`)
        .addField("Website", '[Click Here](https://azure.hussx.xyz)', true)
        .addField("Invite Me", '[Click Here](https://azure.hussx.xyz/invite)', true)
        .addField("Upvote", '[Click Here](https://goo.gl/faHL4g)', true)
        .setThumbnail(bot.user.avatarURL())
        .setTimestamp()
        .setColor("#007FFF")
    channel.send(joinembed).catch((err) => { console.log(err); guild.owner.send(joinembed) })

}