"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const express_validator_1 = require("express-validator");
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', usersController_1.default.getUser);
userRouter.put('/:id', usersController_1.default.updateUser);
userRouter.post('/signup', [(0, express_validator_1.check)('email', 'Email is not correct').isEmail()], usersController_1.default.registration);
userRouter.post('/signin', [(0, express_validator_1.check)('email', 'Email is not correct').isEmail()], usersController_1.default.login);
exports.default = userRouter;
