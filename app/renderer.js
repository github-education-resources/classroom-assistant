var ipcRenderer = require('electron').ipcRenderer

ipcRenderer.on('info', function(event , data){ console.log(data.msg) });
