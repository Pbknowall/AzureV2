const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'accept'];
const no = ['no', 'n', 'nah', 'nope', 'noh'];

class util {

static async verify(channel, user, time = 30000) {//make sure the oppennent accepts the game of tic tac toe
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true; 
		if (no.includes(choice)) return false;
  return false;
	}
}

module.exports = util;