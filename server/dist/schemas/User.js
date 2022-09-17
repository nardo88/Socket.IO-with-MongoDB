"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: String,
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmHash: String,
    lastSeen: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('User', User);
