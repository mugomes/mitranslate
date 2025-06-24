// Copyright (C) 2024-2025 Murilo Gomes Julio
// SPDX-License-Identifier: GPL-2.0-only

// Mestre da Info
// Site: https://www.mestredainfo.com.br

const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.setMaxListeners(20);

contextBridge.exposeInMainWorld('mitranslate', {
    version: (type) => ipcRenderer.invoke('appVersao', type),
    newWindow: (url, width, height, resizable, frame, menu, hide) => ipcRenderer.invoke('appNewWindow', url, width, height, resizable, frame, menu, hide),
    openURL: (url) => ipcRenderer.invoke('appExterno', url),
    readFile: (filename) => ipcRenderer.invoke('appReadFile', filename),
    translate: (de, para, texto, tipo) => ipcRenderer.invoke('appGetTranslate', de, para, texto, tipo),
    listTranslate: (listener) => ipcRenderer.on('list:text', (event, ...args) => listener(...args) + ipcRenderer.removeListener('list:text'))
});