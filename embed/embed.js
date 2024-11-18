import { showQRCode } from '../qr.js';

const errorElem = document.querySelector('#error');
const canvasElem = document.querySelector('canvas');
const ctx = canvasElem.getContext('2d');

function showError(msg) {
  canvasElem.style.display = 'none';
  errorElem.style.display = '';
  errorElem.firstElementChild.textContent = msg;
}

try {
  const url = new URL(window.location.href);
  const s = url.searchParams.get('s');
  if (!s) {
    showError('no input')
  } else {
    showQRCode(ctx, s);
  }
} catch (e) {
  showError(e.toString());
}