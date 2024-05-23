const { app, BrowserWindow, screen  } = await import("electron");
const path = await import("path");
const { fileURLToPath } = await import("url");
const dotenv = await import("dotenv");

dotenv.config();

const createWindow = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const win = new BrowserWindow({
        width: 1500,
        height: 1050,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: true
        },
    })

    if(process.env.mode === "dev") {
        win.loadURL('http://localhost:3000');
    }else {
        win.loadFile(path.join(__dirname, '..', 'build', 'index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();
})