import { showQRCode } from './qr.js';

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
const errorElem = document.querySelector('#error');
const ctx = canvasElem.getContext('2d');

textElem.addEventListener('input', () => {
  updateQRCode(textElem.value);
});

downloadElem.addEventListener('click', () => {
  canvasElem.toBlob(blob => saveBlob(blob, 'qr-code'));
});


function updateQRCode(s) {
  downloadElem.disabled = s ? '' : true;
  canvasElem.height = 1;
  errorElem.textContent = '';
  if (!s) {
    return;
  }
  showQRCode(ctx, s);
}
