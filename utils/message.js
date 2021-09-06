~function(window){
    function Message(){
        this.types = ["success","error","warning","info"]

        this.create = function(){
            var div = document.createElement("div")
            div.textContent = Date.now().toString()
            return div
        }

        this.success = function(){
            let div = this.create()
            document.body.append(div)
            return div
        }
        this.error = function(){
            let div = this.create()
            document.body.append(div)
            return div
        }

        this.close = function(div){
            document.body.removeChild(div)
        }

        const yoshi = { skulk: true }; 
        const hattori = { sneak: true };
        const kuma = { creep: true };  
        Object.setPrototypeOf(yoshi, hattori);
        Object.setPrototypeOf(hattori, kuma);

        console.log(yoshi)
        console.log('skulk' in yoshi)
        console.log('sneak' in yoshi)
        console.log('creep' in yoshi)
    }
    window.Message = Message
}(window)

