module.exports.run = async (bot, message, args) => {

  let rand = Math.floor(Math.random() * 12000) + 1;

  if (rand <= 2) { //edge
    message.channel.send('You won\'t believe this, but the coin landed on its **edge** (0.0008% chance)');
  }
  else if (rand <= 6001) { //heads
    message.channel.send('The coin landed on **heads**');
  }
  else { //tails
    message.channel.send('The coin landed on **tails**');
  }
}
module.exports.help = {
  name: 'coinflip',
  description: 'Flip a coin.',
  aliases: ["coinflip", "flipacoin", "coin-flip", "headsortails"],
  category: "Fun"
} 