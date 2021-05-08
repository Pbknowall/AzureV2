module.exports.run = async (bot, message, args) => {
	if (!args[1] || !args[0]) {
		message.channel.send("Please input 2 different numbers.");
		return;
	}
	
  let num = [args[0], args[1]];
	
	if (num.length !== 2) {
		message.channel.send("First number must be at least 2");
		return;
	}
	
	if (isNaN(num[0]) || isNaN(num[1])) {
		message.channel.errMsg();
		return;
	}
	
  let smallNum = 0;
	if (parseInt(num[0]) <= parseInt(num[1])) {
    smallNum = num[0];
  }
	else {
    smallNum = num[1];
  }
	
	let rand = Math.floor(Math.random()*(Math.abs(parseInt(num[1])-parseInt(num[0]))+1))+parseInt(parseInt(smallNum));
	
	message.channel.send(`You rolled the number **${rand}**`);
}

module.exports.help = {
	name: 'roll',
	description: 'Rolls a random number [Example: roll 10 20]',
	aliases: ["roll", "number"],
	category: "Fun"
}