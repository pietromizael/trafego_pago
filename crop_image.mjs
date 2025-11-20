import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = String.raw`C:\Users\Pietro\.gemini\antigravity\brain\28250d29-1e39-4173-888f-00055a4ff8d7\uploaded_image_1763608792454.png`;
const outputFile = path.join(__dirname, 'assets', 'book_cover_cropped.png');

async function cropImage() {
    try {
        console.log('Reading image...');
        const image = await Jimp.read(inputFile);
        
        console.log('Original size:', image.bitmap.width, image.bitmap.height);
        
        // Auto-crop
        image.autocrop({
            tolerance: 0.1,
            cropOnlyFrames: false,
            cropSymmetric: false,
            leaveBorder: 0
        });
        
        console.log('Cropped size:', image.bitmap.width, image.bitmap.height);
        
        await image.write(outputFile);
        console.log('Image saved to:', outputFile);
        
    } catch (err) {
        console.error('Error processing image:', err);
        // Fallback: try default export if named export failed (though import { Jimp } usually works for v1)
    }
}

cropImage();
