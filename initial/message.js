export var MessageIcon;
(function (MessageIcon) {
    MessageIcon["Success"] = "icon-success-filling";
    MessageIcon["Error"] = "icon-delete-filling";
    MessageIcon["Warning"] = "icon-warning-filling";
    MessageIcon["Info"] = "icon-prompt-filling";
    MessageIcon["Loading"] = "icon-loading";
})(MessageIcon || (MessageIcon = {}));
var Message = /** @class */ (function () {
    function Message(config) {
        var content = config.content, duration = config.duration, type = config.type, onClose = config.onClose;
        this.duration = duration || 3000;
        this.content = content;
        this.type = type || 'success';
        this.onClose = onClose;
        switch (this.type) {
            case 'error':
                this.icon = MessageIcon.Error;
                break;
            case 'warning':
                this.icon = MessageIcon.Warning;
                break;
            case 'info':
                this.icon = MessageIcon.Info;
                break;
            case 'loading':
                this.icon = MessageIcon.Loading;
                break;
            default:
                this.icon = MessageIcon.Success;
                break;
        }
        if (Message.container === null) {
            this.appendContainer();
        }
    }
    Message.prototype.appendContainer = function () {
        Message.container = document.createElement("div");
        Message.container.classList.add("raw-message");
        document.body.appendChild(Message.container);
    };
    // 创建实例
    Message.prototype.created = function () {
        this.instance = null;
        this.instance = document.createElement("div");
        var icon = document.createElement("span");
        var content = document.createElement("span");
        icon.classList.add("iconfont");
        icon.classList.add(this.icon);
        content.textContent = this.content;
        this.instance.append(icon);
        this.instance.append(content);
        this.show();
        return this.instance;
    };
    Message.prototype.close = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            Message.container.removeChild(_this.instance);
            _this.onClose && _this.onClose();
            clearTimeout(_this.timer);
        }, this.duration);
    };
    Message.prototype.show = function () {
        this.instance = this.created();
        Message.container.append(this.instance);
        this.close();
        return this.instance;
    };
    Message.container = null; // 容器
    return Message;
}());
export default Message;
