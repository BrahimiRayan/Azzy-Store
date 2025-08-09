import { v2 as cloudinary } from 'cloudinary';
import { readMultipartFormData } from 'h3';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default defineEventHandler(async (event) => {
  try {

    const form = await readMultipartFormData(event);
    if (!form) {
      return { error: 'No form data received' };
    }
    
    const file = form.find((field) => field.name === 'file');
    if (!file || !file.data) {
      return { error: 'No file uploaded' };
    }

    // Upload the file buffer to Cloudinary (use upload_stream for buffers)
    const result = await new Promise<{secure_url : string , public_id : string}>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image', 
          folder: 'AzzeStore_products_Images', 
        },

        (error, result) => {
          if (error) reject(error);
          else if (result && result.secure_url && result.public_id) {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          } else {
            reject(new Error('Invalid upload result from Cloudinary'));
          }
        }
      );

      uploadStream.end(file.data);
    });

    
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error
  }
});