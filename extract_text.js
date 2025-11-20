const fs = require('fs');

try {
    const rawData = fs.readFileSync('trafego.json');
    const pdfData = JSON.parse(rawData);
    
    let fullText = '';
    
    if (pdfData.Pages) {
        pdfData.Pages.forEach(page => {
            if (page.Texts) {
                page.Texts.forEach(textItem => {
                    try {
                        const text = decodeURIComponent(textItem.R[0].T);
                        fullText += text + ' ';
                    } catch (e) {
                        fullText += textItem.R[0].T + ' ';
                    }
                });
                fullText += '\n\n--- PAGE BREAK ---\n\n';
            }
        });
    }
    
    fs.writeFileSync('extracted_text.txt', fullText);
    console.log('Text saved to extracted_text.txt');
} catch (e) {
    console.error('Error parsing JSON:', e);
}
