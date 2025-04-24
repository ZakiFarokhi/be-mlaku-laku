"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MyLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const winston = require("winston");
const chalk = require("chalk");
const winston_1 = require("winston");
const common_1 = require("@nestjs/common");
let MyLogger = MyLogger_1 = class MyLogger {
    constructor() {
        this.level = 'info';
        this.logger = (0, winston_1.createLogger)(this.getLoggerOptions(this.level));
        this.setContext('Main');
    }
    getLoggerOptions(level) {
        return {
            level: level,
            transports: [
                new winston.transports.File({
                    filename: `${MyLogger_1.LOGS_PATH}/${level}.log`,
                }),
            ],
        };
    }
    setContext(context) {
        this.context = context;
        return this;
    }
    setLevel(level) {
        this.level = level;
        const loggerOptions = this.getLoggerOptions(level);
        this.overrideOptions(loggerOptions);
        return this;
    }
    log(message) {
        this.setLevel('info');
        const currentDate = new Date();
        this.logger.info(message, {
            timestamp: currentDate.toISOString(),
            context: this.context,
        });
        this.logToConsole('info', message);
    }
    error(message, trace) {
        this.setLevel('error');
        const currentDate = new Date();
        this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
            timestamp: currentDate.toISOString(),
            context: this.context,
        });
        this.logToConsole('error', message);
    }
    warn(message) {
        this.setLevel('warn');
        const currentDate = new Date();
        this.logger.warn(message, {
            timestamp: currentDate.toISOString(),
            context: this.context,
        });
        this.logToConsole('warn', message);
    }
    info(message) {
        this.setLevel('info');
        const currentDate = new Date();
        this.logger.info(message, {
            timestamp: currentDate.toISOString(),
            context: this.context,
        });
        this.logToConsole('info', message);
    }
    debug(message) {
        this.setLevel('debug');
        const currentDate = new Date();
        this.logger.info(message, {
            timestamp: currentDate.toISOString(),
            context: this.context,
        });
        this.logToConsole('debug', message);
    }
    overrideOptions(options) {
        this.logger.configure(options);
    }
    logToConsole(level, message) {
        let result;
        const color = chalk;
        const currentDate = new Date();
        const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        switch (level) {
            default:
            case 'info':
                result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(time)} [${color.green(this.context)}] ${message}`;
                break;
            case 'error':
                result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(time)} [${color.green(this.context)}] ${message}`;
                break;
            case 'warn':
                result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(time)} [${color.green(this.context)}] ${message}`;
                break;
        }
        console.log(result);
        this.logger.close();
    }
};
exports.MyLogger = MyLogger;
MyLogger.LOGS_PATH = './../logs';
exports.MyLogger = MyLogger = MyLogger_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MyLogger);
//# sourceMappingURL=logger.service.js.map