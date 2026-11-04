'use strict';
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('multitonic', {
  openProject: id => ipcRenderer.invoke('multitonic:open', id),
  goHome: () => ipcRenderer.invoke('multitonic:home')
});
