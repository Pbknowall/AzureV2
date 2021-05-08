module.exports.run = async (bot, message) => {
    try {
        let emojis;
        if (message.guild.emojis.cache.size === 0) emojis = 'There are no emojis on this server.';
        else emojis = `Emojis in **${message.guild.name}**:\n${message.guild.emojis.cache.map(e => e).join(' ')}`;
        message.channel.send(emojis);
    } catch (err) {
        message.channel.send(`**${err.name}: ${err.message}**`)
    }
}
module.exports.help = {
  name: 'emojis',
  description: 'View existing emojis in the server.',
  aliases: ["emojis", "emoji"],
  category: "Info"
} 