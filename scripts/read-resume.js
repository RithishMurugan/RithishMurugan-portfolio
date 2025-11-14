const path = require('path');
const fs = require('fs');
const PDFParser = require('pdf2json');

function extractTextFromPdf(pdfPath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', (err) => reject(err.parserError || err));
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      try {
        const pages = pdfData.formImage.Pages || [];
        const lines = [];
        for (const page of pages) {
          for (const textObj of page.Texts || []) {
            const decoded = decodeURIComponent((textObj.R || []).map(r => r.T).join(''));
            lines.push(decoded);
          }
          lines.push('\n');
        }
        resolve(lines.join(' '));
      } catch (e) {
        reject(e);
      }
    });

    pdfParser.loadPDF(pdfPath);
  });
}

async function main() {
  const pdfPath = path.join(__dirname, '..', 'public', 'RITHISH_MURUGAN_SoftwareEngineer_Resume.pdf');
  const text = await extractTextFromPdf(pdfPath);
  fs.writeFileSync(path.join(__dirname, '..', 'resume.txt'), text, 'utf8');
  console.log('OK');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
