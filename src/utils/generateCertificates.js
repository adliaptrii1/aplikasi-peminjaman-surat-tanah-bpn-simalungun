// Tulis file docx yang berisi text "Hello World" dan simpan di folder output
const fs = require('fs');
const docx = require('docx');

const { Document, Packer, Paragraph, TextRun } = docx;

const generateCertificates = async () => {
    const doc = new Document();

    doc.addSection({
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                ],
            }),
        ],
    });

    const b64string = await Packer.toBase64String(doc);
    const buffer = Buffer.from(b64string, 'base64');

    fs.writeFileSync('output.docx', buffer);
}

generateCertificates();