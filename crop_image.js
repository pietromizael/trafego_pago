const Jimp = require('jimp');
const path = require('path');

const inputFile = String.raw`C:\Users\Pietro\.gemini\antigravity\brain\28250d29-1e39-4173-888f-00055a4ff8d7\uploaded_image_1763608792454.png`;
const outputFile = path.join(__dirname, 'assets', 'book_cover_cropped.png');

async function cropImage() {
    try {
        const image = await Jimp.read(inputFile);
        
        // Auto-crop based on color difference from top-left pixel
        // tolerance: 0 to 1 (0 is strict, 1 is loose)
        // cropSymmetric: true/false
        // leaveBorder: pixels to leave
        
        console.log('Original size:', image.bitmap.width, image.bitmap.height);
        
        image.autocrop({
            tolerance: 0.1,
            cropOnlyFrames: false,
            cropSymmetric: false,
            leaveBorder: 0
        });
        
        console.log('Cropped size:', image.bitmap.width, image.bitmap.height);
        
        await image.writeAsync(outputFile);
        console.log('Image saved to:', outputFile);
        
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

cropImage();
