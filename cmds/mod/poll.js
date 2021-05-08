const Discord = require('discord.js');

module.exports.run = async (client, message, args, tools) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channels.send('Sorry, you don\'t have permission to create polls!').then(msg => { msg.delete(5000) });
  if (!args.join(' ')) return message.channel.send('Usage: !!poll <title>');

  const embed = new Discord.MessageEmbed()
    .setTitle(args.join(' '))
    .setFooter('React to vote on the Poll!')
    .setColor("#007FFF")
    .setTimestamp()
  message.channel.bulkDelete(1)
  const pollTitle = await message.channel.send({ embed });
  await pollTitle.react('👍');
  await pollTitle.react('👎');

  /*const filter = (reaction) => reaction.emoji.name === '👍';
  const collector = pollTitle.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));*/

  /*const filter1 = (reaction) => reaction.emoji.name === '👎';
  const collector1 = pollTitle.createReactionCollector(filter1, { time: 15000 });
    collector1.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector1.on('end', collected => console.log(`Collected ${collected.size} items`));*/
}

module.exports.help = {
  name: "poll",
  description: "Create a poll.",
  aliases: ["poll", "question"],
  category: "Mod"
}