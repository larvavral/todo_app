const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

// List todo, in progress and done tasks.
var todo_task = [ { content: "heheh", created_time: 0 }];
var in_progress_task = [];
var done_task = [];

// Listen for app to be ready.
app.on("ready", function() {
    // Create new window.
    mainWindow = new BrowserWindow({});

    // Load html file into the window.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: "file",
        slashes: true
    }));

    // // Hide the menu bar.
    // mainWindow.setMenu(null);

    // Load old tasks when initialized app.
    mainWindow.webContents.on("did-finish-load", function() {
        console.log(todo_task);
        mainWindow.webContents.send("load-todo-task", todo_task);
        mainWindow.webContents.send("load-in-progress-task", in_progress_task);
        mainWindow.webContents.send("load-done-task", done_task);
    });

    // // Quit app when closed.
    // mainWindow.on("closed", function() {
    //     app.quit();
    // });
})

// Catch message from "new-task" channel for adding new todo items.
ipcMain.on("new-task", function(e, new_task) {
    todo_task.push({ content: new_task, created_time: new Date() });
});