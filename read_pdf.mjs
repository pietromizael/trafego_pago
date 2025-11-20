import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('trafego.pdf');

try {
    const data = await pdf(dataBuffer);
    console.log(data.text);
} catch (error) {
    console.error(error);
}
