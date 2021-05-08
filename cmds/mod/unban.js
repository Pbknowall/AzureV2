module.exports.run = async (bot, message, args) => {

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        message.channel.send('I cannot unban members!');
        return;
    }
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You don't have permission to unban members.")
    if (!args[0]) message.channel.send('Provide ID of who to unban')
    let usertounban = args[0]
    const bannedalready = message.guild.fetchBans(usertounban).then(bans => {
        if (!bans.usertounban) return;
    })

    message.guild.members.unban(usertounban).catch(() => message.channel.send("This user isn't banned!"))
    if (bannedalready) return;
    message.channel.send(`Unbanned <@${usertounban}> (${usertounban})`);
}

module.exports.help = {
    name: 'unban',
    description: 'Unbans a member.',
    aliases: ["unban"],
    category: "Mod"
}