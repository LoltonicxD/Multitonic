'use strict';
const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// Extend this registry to add another project folder and launcher card.
const projects = [
  { id: 'temptaff', name: 'TempTaff', file: 'TempTaff/index.html' },
  { id: 'regiehm', name: 'regieHM', file: 'regieHM/index.html' }
];
let win;
const homeFile = path.join(__dirname, 'src', 'index.html');
function showHome() { if (win && !win.isDestroyed()) win.loadFile(homeFile); }
function openProject(id) {
  const project = projects.find(item => item.id === id);
  if (project && win && !win.isDestroyed()) win.loadFile(path.join(__dirname, 'src', 'projects', project.file));
}
function createWindow() {
  const iconPath = path.join(__dirname, 'src', 'assets', process.platform === 'win32' ? 'multitonic.ico' : 'multitonic.png');
  const windowOptions = {
    width: 1240, height: 820, minWidth: 800, minHeight: 580,
    title: 'Multitonic', backgroundColor: '#101412', autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
      webSecurity: true, sandbox: true,
      partition: 'persist:multitonic'
    }
  };
  if (fs.existsSync(iconPath)) windowOptions.icon = iconPath;
  win = new BrowserWindow(windowOptions);
  win.loadFile(homeFile);
  win.webContents.on('did-finish-load', () => {
    const current = win.webContents.getURL();
    if (current === `file://${homeFile}` || current.endsWith('/src/index.html')) return;
    win.webContents.executeJavaScript(`(() => {
      if (document.getElementById('__multitonic-home')) return;
      const b=document.createElement('button'); b.id='__multitonic-home'; b.type='button'; b.textContent='←  Accueil';
      Object.assign(b.style,{position:'fixed',top:'10px',left:'10px',zIndex:'2147483647',padding:'9px 14px',border:'1px solid #8b9c8f',borderRadius:'9px',background:'#111a15',color:'#eaf4eb',font:'600 13px system-ui',cursor:'pointer',boxShadow:'0 3px 16px #0008'});
      b.onclick=()=>window.multitonic.goHome(); document.documentElement.appendChild(b);
    })()`);
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    if (/^https?:/.test(url)) { event.preventDefault(); shell.openExternal(url); }
  });
  const menu = Menu.buildFromTemplate([
    { label: 'Multitonic', submenu: [ { label: 'Accueil', accelerator: 'Alt+Left', click: showHome }, { type: 'separator' }, { role: 'quit' } ] },
    { label: 'Affichage', submenu: [ { role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'togglefullscreen' } ] }
  ]);
  Menu.setApplicationMenu(menu);
}
ipcMain.handle('multitonic:open', (_event, id) => { openProject(id); });
ipcMain.handle('multitonic:home', () => { showHome(); });
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
