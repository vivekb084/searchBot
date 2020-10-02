import * as dotenv from 'dotenv';

dotenv.config();

import { connect } from 'mongoose'
import Discord from 'discord.js';
import { envVariable } from './config/envVariable'
import { executeMessage, printMessage } from './controller/messageExecution';

const bot = new Discord.Client();
const TOKEN = envVariable.TOKEN;

connect(envVariable.MONGO_URL, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})  //To Connect MongoDB

bot.login(TOKEN);

bot.on('ready', printMessage);

bot.on('message', executeMessage);
