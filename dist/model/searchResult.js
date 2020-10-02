"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.searchResultSchema = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
exports.searchResultSchema = new mongoose_1.Schema({
    query: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        lowercase: true
    },
    result: []
}, { timestamps: true });
exports.SearchResult = mongoose_1.model(config_1.schemaNames.SEARCH_RESULT, exports.searchResultSchema);
//# sourceMappingURL=searchResult.js.map