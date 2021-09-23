export type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export enum MessageIcon {
    Success = 'icon-success-filling',
    Error = 'icon-delete-filling',
    Warning = 'icon-warning-filling',
    Info = 'icon-prompt-filling',
    Loading = 'icon-loading'
}

interface IceDivInstance extends HTMLDivElement{

}

interface IceMessageConfig {
    content: string
    type?: MessageType
    duration?: number
    onClose?: () => void
}

export default class Message {
    instance: IceDivInstance
    content: string
    timer: number
    duration?: number
    type?: MessageType
    icon: MessageIcon
    onClose?:() => void
    private static container: HTMLDivElement = null  // 容器
    constructor(config: IceMessageConfig) {
        const { content, duration, type, onClose} = config
        this.duration = duration || 3000
        this.content = content
        this.type = type || 'success'
        this.onClose = onClose

        switch (this.type) {
            case 'error':
                this.icon = MessageIcon.Error
                break;
            case 'warning':
                this.icon = MessageIcon.Warning
                break;
            case 'info':
                this.icon = MessageIcon.Info
                break;
            case 'loading':
                this.icon = MessageIcon.Loading
                break;
            default:
                this.icon = MessageIcon.Success
                break;
        }

        if(Message.container === null){
            this.appendContainer()
        }

    }

    private appendContainer() {
        Message.container = document.createElement("div")
        Message.container.classList.add("raw-message")
        document.body.appendChild(Message.container)
    }

    // 创建实例
    created(): IceDivInstance{
        this.instance = null
        this.instance = document.createElement("div")
        var icon = document.createElement("span")
        var content = document.createElement("span")
        icon.classList.add("iconfont")
        icon.classList.add(this.icon)
        content.textContent = this.content
        this.instance.append(icon)
        this.instance.append(content)

        this.show()

        return this.instance
    }

    close(){
        this.timer = setTimeout(()=>{
            Message.container.removeChild(this.instance)
            this.onClose && this.onClose()
            clearTimeout(this.timer)
        }, this.duration)
    }

    show(): IceDivInstance{
        this.instance = this.created()
        Message.container.append(this.instance)
        this.close()
        return this.instance
    }
}

