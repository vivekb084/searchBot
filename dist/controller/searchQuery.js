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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = void 0;
const searchResult_1 = require("../model/searchResult");
const axios_1 = __importDefault(require("axios"));
const envVariable_1 = require("../config/envVariable");
const apiUrl_1 = require("../constants/apiUrl");
exports.searchQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbSearchResult = yield searchResult_1.SearchResult.findOne({ query }, { result: 1, _id: 0 });
        if (dbSearchResult) { //Check If query Exist in DB 
            return dbSearchResult.result;
        }
        const saveResult = new searchResult_1.SearchResult();
        let searchResult = yield searchQueryOnGoogle(query);
        if (!searchResult) {
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
    console.log("Inside searchin gogle");
    return new Promise((resolve, reject) => {
        const params = {
            access_key: envVariable_1.envVariable.SERP_API_KEY,
            query
        };
        let resultArray = [];
        axios_1.default.get(apiUrl_1.SERP_URL, { params })
            .then(response => {
            const apiResponse = response.data;
            for (let i = 0; i < apiResponse.organic_results.length && i < 5; i++) {
                let resultString = apiResponse.organic_results[i].title + ' : ' + apiResponse.organic_results[i].url;
                resultArray.push(resultString);
            }
            resolve(resultArray);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
};
//# sourceMappingURL=searchQuery.js.map