"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongoose_1 = require("mongoose");
const discord_js_1 = __importDefault(require("discord.js"));
const envVariable_1 = require("./config/envVariable");
const messageExecution_1 = require("./controller/messageExecution");
const bot = new discord_js_1.default.Client();
const TOKEN = envVariable_1.envVariable.TOKEN;
mongoose_1.connect(envVariable_1.envVariable.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }); //To Connect MongoDB
bot.login(TOKEN);
bot.on('ready', messageExecution_1.printMessage);
bot.on('message', messageExecution_1.executeMessage);
//# sourceMappingURL=index.js.map