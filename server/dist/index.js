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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = __importDefault(require("./constants/constants"));
const index_1 = __importDefault(require("./routers/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        // разрешаем подключаться с любых адресов
        origin: '*',
    },
});
//  TODO необходимо написать функцию, которая будет создавать роуты и в которой будут создаваться контроллеры в конструктор которых будет передан io
const createRouters = (app, io) => { };
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
app.use('/dialog', index_1.default.dialogs);
app.use('/user', index_1.default.user);
app.use('/messages', index_1.default.message);
exports.io.on('connection', (socket) => {
    console.log('SOCKET');
    socket.on('NEW_MESSAGE', (message) => {
        console.log(`client sed ${message}`);
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(constants_1.default.mongoUrl);
    server.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`);
    });
});
start();
