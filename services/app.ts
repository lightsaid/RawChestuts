~(function (window) {
  function App() {
    this.run = function () {
      try {
        const args = [].slice.call(arguments)
        const fn = args.shift()
        fn.apply(this, args)
      } catch (err) {
        console.log(err)
      }
    }
  }
  function Foo() {
    this.foo = "===foo==="
  }
  Foo.prototype.print = function () {
    console.log(this.foo)
  }
  App.prototype = { Message: new Window.prototype.Message(), Foo: new Foo() }
  Object.defineProperty(App.prototype, "constructor", {
    enumerable: false,
    value: App,
    writable: true,
  })

  var app = new App()
  app.Foo.print()
  function done() {
    console.log("~~done~~")
  }
  let instance = app.Message.success({
    duration: 2000,
    content: "成功~",
    onClose: done,
  })
  let instanc2 = app.Message.success({
    duration: 3000,
    content: "成功~",
    onClose: done,
  })
  let instance3 = app.Message.success({
    duration: 4000,
    content: "成功~",
    onClose: done,
  })
  // app.Message.close(instance, done)

  // console.log(typeof instance)

  const job = {
    name: "zhansan",
    work: function (slogan) {
      //    try{
      //     console.log(this.name + " ing...")
      //     throw new Error("出毛病了。。。")
      //    }catch(err){
      //        console.log(err)
      //    }
      console.log(this.name + slogan)
      throw new Error("出毛病了。。。")
    },
  }

  //    job.work(' ing...')
  app.run.call(job, job.work, " working...")
  app.run.apply(job, [job.work, " ing..."])

  console.log("=====如果不 try catch 后续不会执行=====aaabbb")

  // app.Message.error();
})(window)
