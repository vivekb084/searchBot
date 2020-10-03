"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printMessage = exports.executeMessage = void 0;
const history_1 = require("./history");
const searchQuery_1 = require("./searchQuery");
const history_2 = require("../model/history");
exports.executeMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (msg.content === 'hi') {
            msg.channel.send('hey');
        }
        else if (msg.content.startsWith('!google')) {
            const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();
            if (!searchText) {
                return;
            }
            const user = msg.author.id;
            const userQuery = yield history_2.History.findOneAndUpdate({ query: searchText, user }, { $set: { "updatedAt": new Date() } }, { useFindAndModify: false });
            if (!userQuery) {
                const saveHistory = new history_2.History();
                saveHistory.query = searchText;
                saveHistory.user = user;
                saveHistory.save();
            }
            const searchResponse = yield searchQuery_1.searchQuery(searchText);
            if (!searchResponse || searchResponse == '') {
                return;
            }
            msg.channel.send(searchResponse);
        }
        else if (msg.content.startsWith('!recent')) {
            const historyData = yield history_1.getHistory(msg);
            if (!historyData || historyData == '') {
                return;
            }
            msg.channel.send(historyData);
        }
    }
    catch (error) {
        console.log("Error in Executing Message");
    }
});
exports.printMessage = () => {
    try {
        console.info("Bot Connected Successfully");
    }
    catch (error) {
        console.info("Error in print Message");
    }
};
//# sourceMappingURL=messageExecution.js.map