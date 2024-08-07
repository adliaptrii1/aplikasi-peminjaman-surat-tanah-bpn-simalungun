const fs = require('fs-extra');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// Fungsi untuk membaca dan mengisi template
const createBeritaAcara = async (req, res) => {
    console.log(req.body);

    const data = req.body;

    // Baca template docx
    const content = fs.readFileSync(path.resolve(__dirname, '../../docs/berita_acara_template.docx'), 'binary');
  
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // Ganti placeholder dengan data
    doc.setData(data);

    try {
        doc.render();
        const buf = doc.getZip().generate({ type: 'nodebuffer' });

        // Kirim buf menjadi file docx
        res.writeHead(200, {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename=berita_acara.docx',
        });

        res.end(Buffer.from(buf));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// Baca file JSON
module.exports = { 
    createBeritaAcara 
};
