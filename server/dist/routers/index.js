"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const dialogController_1 = __importDefault(require("../controllers/dialogController"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const validateToken_1 = __importDefault(require("../maddleware/validateToken"));
const express_validator_1 = require("express-validator");
const createRouters = (io) => {
    const userController = new usersController_1.default(io);
    const dialogController = new dialogController_1.default(io);
    const messageController = new messageController_1.default(io);
    const userRouter = (0, express_1.Router)();
    userRouter.get('/me', validateToken_1.default, userController.getMe);
    userRouter.get('/:id', userController.getUser);
    userRouter.put('/:id', userController.updateUser);
    userRouter.post('/signup', [(0, express_validator_1.check)('email', 'Email is not correct').isEmail()], userController.registration);
    userRouter.post('/signin', [(0, express_validator_1.check)('email', 'Email is not correct').isEmail()], userController.login);
    const dialogRouter = (0, express_1.Router)();
    // @ts-ignore
    dialogRouter.post('/', validateToken_1.default, dialogController.add);
    // @ts-ignore
    dialogRouter.get('/', validateToken_1.default, dialogController.getList);
    dialogRouter.delete('/:id', dialogController.removeDialog);
    const messageRouter = (0, express_1.Router)();
    messageRouter.post('/', validateToken_1.default, messageController.add);
    messageRouter.get('/:dialogId', messageController.getList);
    messageRouter.delete('/:id', messageController.removeMessage);
    return {
        userRouter,
        dialogRouter,
        messageRouter,
    };
};
exports.default = createRouters;
