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

export interface IceMessageConfig {
    content: string
    type?: MessageType
    duration?: number
    onClose?: () => void
}

export default class Message {
    private instance: IceDivInstance
    private content: string
    private timer: number
    private duration?: number
    private type?: MessageType
    private icon: MessageIcon
    private onClose?:() => void
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

        this.instance = this.created()
        this.show()
    }

    private appendContainer() {
        Message.container = document.createElement("div")
        Message.container.classList.add("raw-message")
        document.body.appendChild(Message.container)
    }

    // 创建实例
    private created(): IceDivInstance{
        this.instance = document.createElement("div")
        var icon = document.createElement("span")
        var content = document.createElement("span")
        icon.classList.add("iconfont")
        icon.classList.add(this.icon)
        content.textContent = this.content
        this.instance.append(icon)
        this.instance.append(content)
        return this.instance
    }

    private show(): IceDivInstance{
        this.instance = this.created()
        Message.container.append(this.instance)
        this.delayClose()
        return this.instance
    }

    close(){
        Message.container.removeChild(this.instance)
        this.instance = null
    }

    private delayClose(){
        this.timer = setTimeout(()=>{
            if(this.instance){
                Message.container.removeChild(this.instance)
                this.onClose && this.onClose()
                clearTimeout(this.timer)
            }
        }, this.duration)
    }
}
