var AppLogger = /** @class */ (function () {
    function AppLogger(logLevel) {
        this.logLevel = logLevel;
    }
    AppLogger.prototype.setLogLevel = function (logLevel) {
        this.logLevel = logLevel;
    };
    AppLogger.prototype.createPayLoad = function (err, level) {
        if (level === void 0) { level = 'LOGGER'; }
        return {
            level: level,
            message: err === null || err === void 0 ? void 0 : err.message,
            columnNumber: err === null || err === void 0 ? void 0 : err.columnNumber,
            fileName: err === null || err === void 0 ? void 0 : err.fileName,
            lineNumber: err === null || err === void 0 ? void 0 : err.lineNumber,
            stack: err === null || err === void 0 ? void 0 : err.stack
        };
    };
    AppLogger.prototype.writeLog = function (logPayload) {
        var optStr = 'log';
        switch (logPayload.level) {
            case 'ERROR':
                optStr = 'error';
                break;
            case 'WARNING':
                optStr = 'warn';
                break;
            case 'INFO':
                optStr = 'info';
                break;
            case 'DEBUGGER':
                optStr = 'debug';
                break;
            default:
                break;
        }
        console[optStr]("[" + logPayload.level + "]: " + JSON.stringify(logPayload));
    };
    AppLogger.prototype.tryErr = function (fn) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        try {
            fn.apply(void 0, rest);
        }
        catch (error) {
            var payLoad = this.createPayLoad(error, this.logLevel);
            this.writeLog(payLoad);
        }
    };
    return AppLogger;
}());
// 测试
// const createErr = (a: number, b: string, c: boolean) => {
//     console.log(a, b, c)
//     throw new Error("人造错误");
// }
// let appLog = new AppLogger('INFO')
// appLog.setLogLevel("ERROR")
// appLog.tryErr(createErr, 1, 'b', true)
export default new AppLogger();
