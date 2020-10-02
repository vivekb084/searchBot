"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.historySchema = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
exports.historySchema = new mongoose_1.Schema({
    query: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    user: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
exports.History = mongoose_1.model(config_1.schemaNames.HISTORY, exports.historySchema);
//# sourceMappingURL=history.js.map