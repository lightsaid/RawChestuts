
export type LoggerLevel = 'ERROR' | 'WARNING' | 'INFO' | 'LOGGER' | 'DEBUGGER'
export type LoggerPayload = {
    level: LoggerLevel
    message: string
    columnNumber?: string
    fileName?: string
    lineNumber?: string
    stack?: string
}

class AppLogger {
    // ！ 表示不需要经过构造函数赋值
    // name!: string;
    
    private logLevel!: LoggerLevel | undefined;
    constructor(logLevel?: LoggerLevel) { 
        this.logLevel = logLevel
    }
    setLogLevel(logLevel: LoggerLevel){
        this.logLevel = logLevel
    }
    createPayLoad(err: any, level: LoggerLevel = 'LOGGER'): LoggerPayload {
        return {
            level: level,
            message: err?.message,
            columnNumber: err?.columnNumber,
            fileName: err?.fileName,
            lineNumber: err?.lineNumber,
            stack: err?.stack
        }
    }

    writeLog(logPayload: LoggerPayload) {
        type logType = "log" | 'debug' | 'error' | 'info' |'warn'
        let optStr:logType = 'log'
        switch (logPayload.level) {
            case 'ERROR':
                optStr = 'error'
                break;
            case 'WARNING':
                optStr = 'warn'
                break;
            case 'INFO':
                optStr = 'info'
                break;
            case 'DEBUGGER':
                optStr = 'debug'
                break;
            default:
                break;
        }
        console[optStr](`[${logPayload.level}]: ${JSON.stringify(logPayload)}`);
    }

    tryErr(fn: Function, ...rest: any[]) {
        try {
            fn(...rest)
        } catch (error) {
            let payLoad = this.createPayLoad(error, this.logLevel)
            this.writeLog(payLoad)
        }
    }

    /**
    * Error: 人造错误
        columnNumber: 19
        fileName: "http://127.0.0.1:8080/libs/initial/error.js"
        lineNumber: 7
        message: "人造错误"
        stack: "AppLogger.prototype.test@http://127.0.0.1:8080/libs/i
    */
}

// 测试
// const createErr = (a: number, b: string, c: boolean) => {
//     console.log(a, b, c)
//     throw new Error("人造错误");
// }
// let appLog = new AppLogger('INFO')
// appLog.setLogLevel("ERROR")
// appLog.tryErr(createErr, 1, 'b', true)

export default new AppLogger()
