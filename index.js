const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow ({
        height: 430,
        width: 230,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);//create window when the app is ready

    const iconName = process.platform == 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);//generate a correct path based on the runing operating system
    tray = new Tray(iconPath);

    tray.on('click', (event, bounds) => {
        const { x, y } = bounds; // Click event bounds
        const { height, width } = mainWindow.getBounds();
        
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y -height; // Compatibility for Windows so the window shows in the bottom of the screen
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            })
            mainWindow.show();
        }
    })
})