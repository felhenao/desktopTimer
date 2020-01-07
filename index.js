const path = require('path');
const electron = require('electron');
const { app, ipcMain } = electron;
const TimerTray = require('./app/timerTray');
const MainWindow = require('./app/mainWindow');
let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();//keep it from showing in the dock
    mainWindow = new MainWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  
    const iconName = process.platform == 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);//generate a correct path based on the runing operating system
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});