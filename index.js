console.log('here');

import { QrCode, Ecc } from './qrcodegen.js';

const saveBlob = (function() {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function saveData(blob, fileName) {
     const url = window.URL.createObjectURL(blob);
     a.href = url;
     a.download = fileName;
     a.click();
  };
}());

const textElem = document.querySelector('#text');
const canvasElem = document.querySelector('canvas');
const downloadElem = document.querySelector('#download');
const ctx = canvasElem.getContext('2d');

textElem.addEventListener('input', () => {
  updateQRCode(textElem.value);
});

downloadElem.addEventListener('click', () => {
  canvasElem.toBlob(blob => saveBlob(blob, 'qr-code'));
});


function updateQRCode(s) {
  downloadElem.disabled = s ? '' : true;
  if (!s) {
    canvasElem.width = 1;
    return;
  }
  const qr = QrCode.encodeText(s, Ecc.MEDIUM);
  const scale = 4;
  const padding = 3;
  const size = qr.size + padding * 2;
  ctx.canvas.width = size * scale;
  ctx.canvas.height = size * scale;
  ctx.scale(scale, scale);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      ctx.fillStyle = qr.getModule(x - padding, y - padding) ? 'black' : 'white';
      ctx.fillRect(x, y, 1, 1);
    }
  }
  //const img = new Image();
  //img.src = ctx.canvas.toDataURL();
  //qrCodesElem.appendChild(el('div', {
  //  className: 'qrcode',
  //}, [
  //  el('div', {textContent: s}),
  //  img,
  //]));
}

console.log('here');