import { QrCode, Ecc } from './qrcodegen.js';

export function showQRCode(ctx, s) {
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
}
