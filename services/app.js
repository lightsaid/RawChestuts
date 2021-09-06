~function(){
    function App(){

    }
    function Foo() {
        this.foo = "===foo==="
    }
    Foo.prototype.print = function(){
        console.log(this.foo)
    }
    App.prototype = { Message: new Message(), Foo: new Foo() }
    Object.defineProperty(App.prototype, "constructor", { 
        enumerable: false, 
        value: App, 
        writable: true 
    })

    var app = new App()
    app.Foo.print()
    let dom = app.Message.success()
    app.Message.error();
    dom.style.display = "none"
}(window)