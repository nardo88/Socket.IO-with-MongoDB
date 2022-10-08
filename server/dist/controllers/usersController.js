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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
class UserController {
    constructor(io) {
        this.io = io;
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(400).json({ message: 'Ошибка при регистрации', error });
                }
                const { email, fullName, password } = req.body;
                const candidate = yield User_1.default.findOne({ email });
                if (candidate) {
                    return res.json({ status: 'error', message: 'User already exist' });
                }
                const user = yield new User_1.default({
                    _id: (0, uuid_1.v4)(),
                    email,
                    fullName,
                    password: bcrypt_1.default.hashSync(password, 7),
                    confirmHash: '' + new Date().valueOf(),
                    lastSeen: '',
                });
                yield user.save();
                return res.json(user);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findById(id);
                if (user) {
                    return res.json(user);
                }
                else {
                    return res.status(404).json('User not found');
                }
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const { id } = req.user;
                const user = yield User_1.default.findById(id);
                if (user) {
                    return res.json(user);
                }
                else {
                    return res.status(404).json('User not found');
                }
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                yield User_1.default.findByIdAndUpdate(id, body);
                return res.json('success');
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.json({ message: 'Ошибка при регистрации', error });
                }
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return res.json({ message: 'Неверный логин или пароль' });
                }
                if (!user.confirmed) {
                    return res.json({
                        status: 'error',
                        message: 'Пользователь не подтвержден',
                    });
                }
                const validate = bcrypt_1.default.compareSync(password, user.password);
                if (!validate) {
                    return res.json({ message: 'Неверный логин или пароль' });
                }
                const token = (0, generateJWT_1.default)(user._id);
                res.json({ token });
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    confirm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { hash } = req.params;
                const user = yield User_1.default.findOne({ confirmHash: hash, confirmed: false });
                if (!user) {
                    return res.json({ status: 'error', message: 'Hash not found' });
                }
                user.confirmed = true;
                yield user.save();
                const token = (0, generateJWT_1.default)(user._id);
                res.json({ token });
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
exports.default = UserController;
