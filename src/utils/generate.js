const fs = require('fs-extra');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// Fungsi untuk membaca dan mengisi template
const createCertificate = (data, outputPath) => {
  // Baca template docx
  const content = fs.readFileSync(path.resolve(__dirname, 'sertifikat_template.docx'), 'binary');
  
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Ganti placeholder dengan data pemenang
  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    console.error(JSON.stringify({ error: error }, null, 2));
    throw error;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Simpan file output
  fs.writeFileSync(outputPath, buf);
};

// Baca file JSON
const winners = JSON.parse(fs.readFileSync('utils/pemenang.json', 'utf8'));

// Generate sertifikat untuk setiap pemenang
winners.forEach((winner) => {
  const outputPath = path.resolve(__dirname, `sertifikat_${winner.name.replace(/\s+/g, '_')}.docx`);
  createCertificate(winner, outputPath);
  console.log(`Sertifikat untuk ${winner.name} telah dibuat: ${outputPath}`);
});
