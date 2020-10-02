import * as dotenv from 'dotenv';

dotenv.config();

import Discord from 'discord.js';
import { envVariable } from './config/envVariable'

const bot = new Discord.Client();
const TOKEN = envVariable.TOKEN;


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'hi') {
    // msg.reply('hey');
    msg.channel.send('hey');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});
