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
exports.searchQuery = void 0;
const searchResult_1 = require("../model/searchResult");
exports.searchQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbSearchResult = yield searchResult_1.SearchResult.findOne({ query }, { result: 1, _id: 0 });
        if (dbSearchResult) { //Check If query Exist in DB 
            return dbSearchResult.result;
        }
        const saveResult = new searchResult_1.SearchResult();
        let searchResult = yield searchQueryOnGoogle(query);
        if (!searchResult) {
            console.log("Inside empty search resose");
            return '';
        }
        saveResult.query = query.toLowerCase();
        saveResult.result = searchResult;
        saveResult.save();
        return searchResult;
    }
    catch (error) {
        console.log("Error in Search Query");
        return '';
    }
});
const searchQueryOnGoogle = (query) => {
    return new Promise((resolve, reject) => {
        resolve(['test2', 'test2', 'test3']);
    });
};
//# sourceMappingURL=searchQuery.js.map