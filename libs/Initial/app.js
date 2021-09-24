// 这里不能写message.ts,也不能省略.js
import Message from './message.js';
var msg1 = new Message({ content: '成功', duration: 2000, onClose: function () { console.log("成功关闭了"); } });
var msg2 = new Message({ content: '错误', type: "error", duration: 7000, onClose: function () { console.log("错误关闭了"); } });
var msg3 = new Message({ content: '警告', type: "warning", onClose: function () { console.log("警告关闭了"); } });
var msg4 = new Message({ content: 'info', type: "info", duration: 5000 });
var msg5 = new Message({ content: 'loading', type: "loading" });
msg4.close();
