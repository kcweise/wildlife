
import os

def rename_pictures(folder_path):
    
    files = os.listdir(folder_path)
    
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')
    images = [file for file in files if file.lower().endswith(image_extensions)]
    
    images.sort()
    
    for index, image in enumerate(images):
        new_name=f"animal_pic_{index + 1:03d}{os.path.splitext(image)[1]}"
        
        old_path = os.path.join(folder_path, image)
        new_path = os.path.join(folder_path, new_name)
        
        os.rename(old_path, new_path)
        print(f'Renamed: {old_path} to {new_path}')
        
folder_path = '.'
rename_pictures(folder_path)

        
    