// Copyright (C) 2024-2025 Murilo Gomes Julio
// SPDX-License-Identifier: GPL-2.0-only

// Mestre da Info
// Site: https://www.mestredainfo.com.br

const { ipcMain, dialog, BrowserWindow } = require('electron')
const fs = require('fs');

module.exports = {
    mifunctions: function (win, miNewWindow, miPath) {
        // Abrir aplicativo externo
        ipcMain.handle('appExterno', async (event, url) => {
            require('electron').shell.openExternal(url);
        });

        // Obter versão do aplicativo e recursos
        ipcMain.handle('appVersao', async (event, tipo) => {
            if (tipo == 'mitranslate') {
                return require('electron').app.getVersion();
            } else if (tipo == 'electron') {
                return process.versions.electron;
            } else if (tipo == 'node') {
                return process.versions.node;
            } else if (tipo == 'chromium') {
                return process.versions.chrome;
            } else {
                return '';
            }
        });

        // Abre uma nova janela personalizada
        ipcMain.handle('appNewWindow', async (event, url, width, height, resizable, frame, menu, hide) => {
            miNewWindow(url, width, height, resizable, frame, menu, hide);
        });


        // Função para ler arquivo
        ipcMain.handle('appReadFile', async (event, filename, externo) => {
            const fs = require('fs');
            const path = require('path');
            try {
                if (externo) {
                    return fs.readFileSync(filename, "utf8");
                } else {
                    return fs.readFileSync(path.join(miPath, filename), "utf8");
                }
            } catch (err) {
                return false;
            }
        });

        function trim(str, chr) {
            var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^' + chr + '+|' + chr + '+$', 'g');
            return str.replace(rgxtrim, '');
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

        // Terminal
        ipcMain.handle('appGetTranslate', async (event, de, para, texto, tipo) => {
            try {
                if (fs.existsSync('/usr/bin/trans')) {
                    var childProcess = require('child_process');
                    let child;
                    if (tipo == 'traduzir') {
                        child = childProcess.exec(`/usr/bin/trans -e google -b ${de}:${para} \"${texto}\"`);
                    } else {
                        child = childProcess.exec(`/usr/bin/trans ${de}:${para} -e google -no-ansi -d \"${texto}\"`);
                    }

                    child.stdout.on('data', (d) => {
                        win.webContents.send('list:text', d);
                    });

                    child.stdout.on('close', () => {
                        child.unref();
                        child.kill();
                    });
                } else {
                    return false;
                }
            } catch (err) {
                return err;
            }
        });
    }
}