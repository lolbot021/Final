const { createInterface } = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const QRCode = require('qrcode');

async function main() {
  const terminal = createInterface({ input: stdin, output: stdout });
  const text = await terminal.question('Enter text or a website link for your QR code: ');
  terminal.close();

  if (!text.trim()) {
    console.log('Please enter some text or a link, then try again.');
    process.exitCode = 1;
    return;
  }

  await QRCode.toFile('my-qr-code.png', text.trim(), {
    width: 320,
    margin: 2,
    color: { dark: '#142019', light: '#ffffff' }
  });

  console.log('Done! Your QR image is saved as my-qr-code.png');
}

main().catch((error) => {
  console.error('Could not make the QR code:', error.message);
  process.exitCode = 1;
});
