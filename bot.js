const request = require('request');
const fs = require('fs');
const discord = require('discord.js');
const { prefix } = require('./config.json');
const db = require("quick.db");
const client = new discord.Client();
client.commands = new discord.Collection();
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
//-----------------------------------------------

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	
	if (!message.content.startsWith(prefix)) return;

	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	// Get the command
	let command = client.commands.get(cmd);
	// If none is found, try to find it by alias
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	// If a command is finally found, run the command
	if (command) command.run(client, message, args);

	try {
		client.commands.get(cmd);
		client.channels.cache
			.get('CHANNEL ID logs')
			.send(
				`**[LOGGER] ${message.guild.name}**: ${message.author.tag} used (**${
					client.commands.get(cmd).name
	 }) ${message}**`
			);
	} catch (err) {
		console.log(err);
	}
}); 



		
client.on('ready', () => {
	

	console.log('Online.');
});

client.login("BOT TOKEN");
