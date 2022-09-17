"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', usersController_1.default.getUser);
userRouter.put('/:id', usersController_1.default.updateUser);
userRouter.post('/', usersController_1.default.addUser);
exports.default = userRouter;
