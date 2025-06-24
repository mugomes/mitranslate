// Copyright (C) 2024-2025 Murilo Gomes Julio
// SPDX-License-Identifier: GPL-2.0-only

// Mestre da Info
// Site: https://www.mestredainfo.com.br

async function btnTraduzir() {
     let sIdioma = document.getElementById('cboIdioma').value;
     let sTraduzir = document.getElementById('cboTraduzir').value;
     let sTexto = document.getElementById('txtTexto').value;
     
     await mitranslate.translate(sIdioma, sTraduzir, sTexto, 'traduzir');
    
    mitranslate.listTranslate((sValue) => {
        document.getElementById('resultado').value = sValue;
    });
}

async function btnDicionario() {
     let sIdioma = document.getElementById('cboIdioma').value;
     let sTraduzir = document.getElementById('cboTraduzir').value;
     let sTexto = document.getElementById('txtTexto').value;
     
     await mitranslate.translate(sIdioma, sTraduzir, sTexto, 'dicionario');
    
    mitranslate.listTranslate((sValue) => {
        document.getElementById('resultado').value = sValue;
    });
}

function btnTransferir() {
    let cboIdioma = document.getElementById('cboIdioma');
    let cboTraduzir = document.getElementById('cboTraduzir');
    let cboTemp = cboIdioma.value;
    cboIdioma.value = cboTraduzir.value;
    cboTraduzir.value = cboTemp;
}

// async function checkHash(e) {
//     let sTipoHash = document.getElementById('txtTipoHash').value;

//     if (document.getElementById('txtArquivo').value == '') {
//         document.getElementById('resultado').innerHTML = '<div class="alert alert-danger">Selecione um arquivo para verificar o hash.</div>';
//         return false;
//     }

//     document.getElementById('resultado').innerHTML = '<div class="alert alert-info">Verificando hash...</div>';

//     micheckhash.getHash(sTipoHash, document.getElementById('txtArquivo').value).then((sHashFile) => {
//         let sHash = document.getElementById('txtHash').value;

//         document.getElementById('hash').innerHTML = sHashFile;

//         if (sHashFile == sHash) {
//             micheckhash.translate('Success! The file hash is the same as the entered hash.').then((sValue) => {
//                 document.getElementById('resultado').innerHTML = `<div class="alert alert-success">${sValue}</div>`;
//             });
//         } else {
//             micheckhash.translate('Danger! The file hash is different from the reported hash.').then((sValue) => {
//                 document.getElementById('resultado').innerHTML = `<div class="alert alert-danger">${sValue}</div>`;
//             });
//         }
//     });

//     e.preventDefault();
// }