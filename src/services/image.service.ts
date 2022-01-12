import { Service } from 'typedi';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

import { GenericException } from '@src/config/custom-error.config';
import config from '@src/config';

@Service()
export default class ImageService {
  public async upload(path: string, folder?: string): Promise<{ url: string }> {
    try {
      cloudinary.config({
        cloud_name: config.cloudinary.name,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret,
      });

      const result = await cloudinary.uploader.upload(path, {
        folder: config.cloudinary.folder + (folder ? `/${folder}` : ''),
      });
      fs.unlinkSync(path);

      return { url: result.url };
    } catch (err) {
      throw new GenericException('uploadImage', 'Upload image failed');
    }
  }
}
