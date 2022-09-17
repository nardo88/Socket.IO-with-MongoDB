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
class UserController {
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, fullName, password } = req.body;
                const candidate = yield User_1.default.findOne({ email });
                if (candidate) {
                    return res.status(500).json('User already exist');
                }
                const user = yield new User_1.default({
                    email,
                    fullName,
                    password: bcrypt_1.default.hashSync(password, 7),
                    confirmHash: '',
                    lastSeen: '',
                });
                yield user.save();
                return res.json(user._id);
            }
            catch (e) {
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
}
exports.default = new UserController();
