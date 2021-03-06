"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = void 0;
const history_1 = require("../model/history");
/**
 * Get All previous query by user matching current query
 * @param {Object} message Query to be searched.
 * return string Array
 */
exports.getHistory = (message) => {
    return new Promise((resolve, reject) => {
        try {
            let historyArray = [];
            const query = (message.content.replace("!recent", "")).trim().toLowerCase(); // tokenize and trim search string
            const regexQuery = '.*' + query + '.*';
            const user = message.author.id; //To get user specific history
            history_1.History.find({ query: new RegExp('^' + regexQuery + '$', "i"), user }).sort({ updatedAt: -1 }).then(result => {
                for (let i = 0; i < result.length; i++) {
                    historyArray.push(result[i].query);
                }
                resolve(historyArray);
            });
        }
        catch (error) {
            console.log("Error in fetching Histrory");
            reject(error);
        }
    });
};
//# sourceMappingURL=history.js.map