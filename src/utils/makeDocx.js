const fs = require('fs');
const officegen = require('officegen');
const path = require('path');

// Baca file JSON
const winners = JSON.parse(fs.readFileSync('public/pemenang.json', 'utf8'));

// Fungsi untuk membuat sertifikat
const createCertificate = (name, position) => {
  const docx = officegen('docx');

  const pObj = docx.createP();
  pObj.addText('SERTIFIKAT PENGHARGAAN', { bold: true, font_size: 48 });
  pObj.options.align = 'center';
  pObj.addLineBreak();

  const pObj2 = docx.createP();
  pObj2.addText(`Diberikan kepada: ${name}`, { font_size: 32 });
  pObj2.options.align = 'center';
  pObj2.addLineBreak();

  const pObj3 = docx.createP();
  pObj3.addText(`Sebagai: ${position}`, { font_size: 32 });
  pObj3.options.align = 'center';
  pObj3.addLineBreak();

  const pObj4 = docx.createP();
  pObj4.addText('Dengan penghargaan setinggi-tingginya atas prestasi yang dicapai.', { font_size: 24 });
  pObj4.options.align = 'center';

  return docx;
};

// Generate sertifikat untuk setiap pemenang
winners.forEach((winner, index) => {
  const docx = createCertificate(winner.name, winner.position);
  const filePath = path.join(__dirname, `sertifikat_${winner.name.replace(/\s+/g, '_')}.docx`);
  const out = fs.createWriteStream(filePath);

  docx.generate(out, {
    finalize: () => {
      console.log(`Sertifikat untuk ${winner.name} telah dibuat: ${filePath}`);
    },
    error: (err) => {
      console.error(err);
    },
  });
});
