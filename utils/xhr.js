/**
 * 简版请求封装
 */

~(function () {
  function Ajax(){
    let xmlHttp;
    this.setXmlHttp = function(){
      if (typeof XMLHttpRequest === "function") {
        xmlHttp = new XMLHttpRequest()
      } else if (typeof ActiveXObject === "function") {
        xmlHttp = new ActiveXObject("MSXML2.XMLHTTP.3.0")
      } else {
        // 什么破浏览器
        xmlHttp = null
      }
    }
    this.getXmlHttp = function(){
      return xmlHttp
    }

    /**
     * 
     * @args {Object} {method: 'get', url:'http://xxx', data:{}, header:{}} 
     */
    this.request = function(args){  
      let xhr = this.getXmlHttp() 
      xhr.open ("POST", "http://localhost:9999/api/sku/select", false)
      xhr.setRequestHeader ('Content-type', 'application/json')
      xhr.send({});  //发送请求
      console.log(xhr.responseText);  //接收数据
      // xhr.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded')
    }

    // 默认生成 xmlHttp
    this.setXmlHttp()
  }


  Ajax.prototype.get = function(){
    let xmlHttp = this.getXmlHttp()

  }

  var ajax = new Ajax()
  ajax.request()

  var xmlHttp = null
  if (typeof XMLHttpRequest === "function") {
    xmlHttp = new XMLHttpRequest()
  } else if (typeof ActiveXObject === "function") {
    xmlHttp = new ActiveXObject("MSXML2.XMLHTTP.3.0")
  } else {
    // 什么破浏览器
  }
  if (!xmlHttp) {
    return
  }

  xmlHttp.addEventListener("progress", updateProgress)
  xmlHttp.addEventListener("load", transferComplete)
  xmlHttp.addEventListener("error", transferFailed)
  xmlHttp.addEventListener("abort", transferCanceled)
  
//   xhr.open(method, url, async, username, password);
  xmlHttp.open()



  // progress on transfers from the server to the client (downloads)
  function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = (oEvent.loaded / oEvent.total) * 100
      // ...
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(evt) {
    console.log("The transfer is complete.")
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.")
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.")
  }
})()
