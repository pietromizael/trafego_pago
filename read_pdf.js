const fs = require('fs');
const pdfModule = require('pdf-parse');

console.log('Keys:', Object.keys(pdfModule));

let pdf = pdfModule;
if (typeof pdf !== 'function') {
    if (pdfModule.default) {
        pdf = pdfModule.default;
        console.log('Using default export');
    } else if (pdfModule.PDFParse) {
        pdf = pdfModule.PDFParse;
        console.log('Using PDFParse export');
    }
}

let dataBuffer = fs.readFileSync('trafego.pdf');

if (typeof pdf === 'function') {
    try {
        // Some versions might expect (dataBuffer, options)
        pdf(dataBuffer).then(function(data) {
            console.log(data.text);
        }).catch(function(error){
            console.error('Error in promise:', error);
        });
    } catch (e) {
        console.error('Error calling function:', e);
    }
} else {
    console.error('Could not find PDF parsing function. Type is:', typeof pdf);
}
