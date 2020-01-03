const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow ({
        height: 430,
        width: 230,
        frame: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform == 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);//generate a correct path based on the runing operating system

    new Tray(iconPath);
})