const Discord = require("discord.js");
const { stripIndents } = require('common-tags');
const { verify } = require('./../../util.js');

//do you understand the command?
module.exports.run = async (bot, message, args) => {
	this.playing = new Set();
	let opponent = message.guild.member(message.mentions.users.first() || message.mentions.users.get(1)); //gets the first mentioned member in the messsage
	if (!opponent) return message.channel.send('Please mention a user to go against.'); //=== message.guild.members.filter(member => member.user.bot)
	if (opponent.user.bot) {
		return message.channel.send('Bots may not be played against.'); //Checks if mentioned member is a bot
	}
	if (opponent.id === message.author.id) return message.channel.send('You may not play against yourself.'); //check if the mentioned member is the message author
	if (this.playing.has(message.channel.id)) return message.channel.send('Only one game may be occurring per channel.'); //Means that only one game chan happen per channel
	this.playing.add(message.channel.id); //Adds the channel id to make sure only one game can happen per channel
	try {
		await message.channel.send(`${opponent}, do you accept this challenge?`);//verifys 
		const verification = await verify(message.channel, opponent);
		if (!verification) {//if no one verifys ends command 
			this.playing.delete(message.channel.id);
			return message.channel.send('Looks like they declined...');
		}
		const sides = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:']; //All the spaces on the game thing
		const taken = []; //taken is set empty at the start of the game
		let userTurn = true;
		let winner = null;
		while (!winner && taken.length < 9) {
			const user = userTurn ? message.author : opponent;
			const sign = userTurn ? ':x:' : ':o:';
			await message.channel.send(stripIndents`
					${user.toString()}, what space do you pick?
					
					${sides[0]} | ${sides[1]} | ${sides[2]}
					———————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					———————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					
				`);
			const turn = await message.channel.awaitMessages(res => res.author.id === user.id, { //waits for user to pick a place
				max: 1,
				time: 15000
			})
			if (!turn.size) {//if the time = 30000 will skip turn you can change this to be longer or shorter if you want
				await message.channel.send('Sorry, time is up!');
				userTurn = !userTurn;
				continue;
			}
			let choice = turn.first().content.toLowerCase();
			if (choice === 'end') break;
			if (choice === '0') choice = ':zero:';
			if (choice === '1') choice = ':one:';
			if (choice === '2') choice = ':two:';
			if (choice === '3') choice = ':three:';
			if (choice === '4') choice = ':four:';
			if (choice === '5') choice = ':five:';
			if (choice === '6') choice = ':six:';
			if (choice === '7') choice = ':seven:';
			if (choice === '8') choice = ':eight:';
			if (taken.includes(choice)) {
				await message.channel.send('That spot is already taken!');//if the spot is in taken above it will send this message
			} else if (!sides.includes(choice)) { //if the spot doesnt exist it will send a message
				await message.channel.send('I don\'t think that is a valid spot...');
			} else {
				if (choice === ':zero:') choice = '0';
				if (choice === ':one:') choice = '1';
				if (choice === ':two:') choice = '2';
				if (choice === ':three:') choice = '3';
				if (choice === ':four:') choice = '4';
				if (choice === ':five:') choice = '5';
				if (choice === ':six:') choice = '6';
				if (choice === ':seven:') choice = '7';
				if (choice === ':eight:') choice = '8';
				sides[Number.parseInt(choice, 10)] = sign; //otherwise it will check if there is a three in a row
				taken.push(choice);
				if (
					(sides[0] === sides[1] && sides[0] === sides[2])
					|| (sides[0] === sides[3] && sides[0] === sides[6])
					|| (sides[3] === sides[4] && sides[3] === sides[5])
					|| (sides[1] === sides[4] && sides[1] === sides[7])
					|| (sides[6] === sides[7] && sides[6] === sides[8])
					|| (sides[2] === sides[5] && sides[2] === sides[8])
					|| (sides[0] === sides[4] && sides[0] === sides[8])
					|| (sides[2] === sides[4] && sides[2] === sides[6])
				) winner = userTurn ? message.author : opponent;
				userTurn = !userTurn;
			}
		}
		this.playing.delete(message.channel.id); //will remove the channels id
		return message.channel.send(winner ? `Congrats, ${winner}!` : 'Oh... The cat won.'); //will either say the winner or call a draw
	} catch (err) {
		this.playing.delete(message.channel.id);
		throw err;
	}
}

module.exports.help = {
	name: "tictactoe",
	description: "Play Tic-Tac-Toe",
	aliases: ["tictactoe", "ttt"],
	category: "Fun"
}