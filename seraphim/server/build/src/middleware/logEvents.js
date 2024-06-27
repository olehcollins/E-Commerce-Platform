"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logger = exports.logEvent = void 0;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logEvent = (message, logName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = `${(0, date_fns_1.format)(new Date(), "dd/MM/yyyy-HH:mm:ss")}`;
    const logItem = `date-time: ${dateTime}\t id: ${(0, uuid_1.v4)()}\t ${message}\n`;
    const chalk = (yield Promise.resolve().then(() => __importStar(require("chalk")))).default;
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "logs"))) {
            fs_1.default.mkdir(path_1.default.join(__dirname, "..", "logs"), (err) => {
                err ? console.log(err) : console.log(chalk.blueBright("logs Directory created"));
            });
        }
        yield promises_1.default.appendFile(path_1.default.join(__dirname, "..", "logs", logName), logItem);
        console.log(chalk.cyanBright(logItem));
    }
    catch (error) {
        console.log(error);
    }
});
exports.logEvent = logEvent;
const logger = (req, res, next) => {
    const origin = req.headers["origin"] || "unknown";
    (0, exports.logEvent)(`method: ${req.method}\t origin: ${origin}\t url: ${req.url}`, "reqLog.txt");
    console.log(`method: ${req.method}, url: ${req.url}`);
    next();
};
exports.logger = logger;
