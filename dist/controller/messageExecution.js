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
const searchQuery_1 = require("./searchQuery");
const searchResult_1 = require("../model/searchResult");
exports.executeMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.content === 'hi') {
        msg.channel.send('hey');
    }
    else if (msg.content.startsWith('!google')) {
        const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();
        const dbSearchResult = yield searchResult_1.SearchResult.findOne({ query: searchText }, { result: 1, _id: 0 });
        if (dbSearchResult) {
            msg.channel.send(dbSearchResult.result);
            return;
        }
        let searchResponse = yield searchQuery_1.searchQuery(searchText);
        if (!searchResponse) {
            return;
        }
        const saveResult = new searchResult_1.SearchResult();
        saveResult.query = searchText.toLowerCase();
        saveResult.result = searchResponse;
        saveResult.save();
        msg.channel.send(searchResponse);
    }
});
exports.printMessage = () => {
    console.info("Bot Connected Successfully");
};
//# sourceMappingURL=messageExecution.js.map