~function (Window) {
    function Message() {
        var typesClass = { success: "icon-success-filling", error: "", warning: "", info: "", loading: "" };
        var messageWrapper = null;
        this.duration = 3000;
        this.setMessageWrapper = function () {
            messageWrapper = document.getElementById("message-wrapper");
            if (!messageWrapper) {
                var div = document.createElement("div");
                div.id = "message-wrapper";
                document.body.append(div);
                messageWrapper = div;
            }
        };
        // 创建容器
        this.setMessageWrapper();
        this.create = function (config, iconName) {
            var div = document.createElement("div");
            div.isDel = false;
            var icon = document.createElement("span");
            var content = document.createElement("span");
            icon.classList.add("iconfont");
            icon.classList.add(iconName);
            content.textContent = config.content;
            div.append(icon);
            div.append(content);
            return div;
        };
        this.close = function (dom, configOrFunc) {
            if (dom && typeof configOrFunc === 'function') {
                !dom.isDel && messageWrapper.removeChild(dom);
                dom.isDel = !dom.isDel;
                configOrFunc();
                return;
            }
            var duration = configOrFunc.duration || this.duration;
            var timer = setTimeout(function () {
                !dom.isDel && messageWrapper.removeChild(dom);
                dom.isDel = !dom.isDel;
                configOrFunc.onClose && typeof configOrFunc.onClose === 'function' && configOrFunc.onClose();
                clearTimeout(timer);
            }, duration);
        };
        // config = { duration: 5000, content: "成功~", onClose: function }
        this.success = function (config) {
            var div = this.create(config, typesClass.success);
            messageWrapper.append(div);
            this.close(div, config);
            return div;
        };
        // this.error = function(){
        //     let div = this.create()
        //     messageWrapper.append(div)
        //     return div
        // }
        var yoshi = { skulk: true };
        var hattori = { sneak: true };
        var kuma = { creep: true };
        Object.setPrototypeOf(yoshi, hattori);
        Object.setPrototypeOf(hattori, kuma);
        console.log(yoshi);
        console.log('skulk' in yoshi);
        console.log('sneak' in yoshi);
        console.log('creep' in yoshi);
    }
    Window.prototype.Message = Message;
}(Window);
