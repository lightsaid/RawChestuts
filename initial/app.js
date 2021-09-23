import Message from './message';
var msg1 = new Message({ content: '成功', duration: 2000, onClose: function () { console.log("成功关闭了"); } });
var msg2 = new Message({ content: '错误', duration: 7000, onClose: function () { console.log("错误关闭了"); } });
var msg3 = new Message({ content: '警告', onClose: function () { console.log("警告关闭了"); } });
var msg4 = new Message({ content: 'info', duration: 5000 });
var msg5 = new Message({ content: 'loading', type: "loading" });
