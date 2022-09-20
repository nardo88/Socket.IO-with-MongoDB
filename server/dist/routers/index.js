"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const dialogs_1 = __importDefault(require("./dialogs"));
const message_1 = __importDefault(require("./message"));
exports.default = {
    user: users_1.default,
    dialogs: dialogs_1.default,
    message: message_1.default,
};
