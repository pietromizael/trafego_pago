from PIL import Image, ImageChops

def auto_crop(image_path, output_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGB")
        
        # Get the background color from the top-left pixel
        bg = Image.new(img.mode, img.size, img.getpixel((0, 0)))
        
        # Calculate the difference between the image and the background
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        
        # Get the bounding box of the non-background content
        bbox = diff.getbbox()
        
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(output_path)
            print(f"Image cropped successfully to {bbox}")
        else:
            print("Could not determine bounding box, saving original.")
            img.save(output_path)
            
    except Exception as e:
        print(f"Error cropping image: {e}")

# Use the uploaded image
input_file = r"C:\Users\Pietro\.gemini\antigravity\brain\28250d29-1e39-4173-888f-00055a4ff8d7\uploaded_image_1763608792454.png"
output_file = r"c:\Users\Pietro\.gemini\antigravity\scratch\trafego_organico\assets\book_cover.png"

auto_crop(input_file, output_file)
