"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_CONFIG = void 0;
const global_constants_1 = require("../shared/constants/global.constants");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
exports.GLOBAL_CONFIG = {
    nest: {
        port: 3000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'Nestjs Prisma Starter',
        description: 'The nestjs API description',
        version: '1.5',
        path: global_constants_1.API_PREFIX,
    },
    security: {
        accessToken: {
            expiresIn: 3600 * 1,
            bcryptSaltOrRound: 10,
        },
        refreshToken: {
            expiresIn: 3600 * 24,
            bcryptSaltOrRound: 10,
        },
    },
    logger: {
        transports: [
            new winston_1.transports.DailyRotateFile({
                filename: `logs/%DATE%-error.log`,
                level: 'error',
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxFiles: '30d',
            }),
            new winston_1.transports.DailyRotateFile({
                filename: `logs/%DATE%-combined.log`,
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxFiles: '30d',
            }),
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.cli(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.printf((info) => {
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                })),
            }),
        ],
    },
};
//# sourceMappingURL=global.config.js.map