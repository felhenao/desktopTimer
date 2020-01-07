const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor () {
        super({
            height: 430,
            width: 230,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: { backgroundThrottling: false}//prevent electron from freezing the timer (reducing resources) when the window is closed **full performance
        });
        this.on('blur', this.onBlur.bind(this));
    }
    onBlur() {
        this.hide();
    }//make the window disapear when the user clicks away from it
}

module.exports = MainWindow;