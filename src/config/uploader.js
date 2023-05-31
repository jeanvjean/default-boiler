// eslint-disable-next-line import/no-extraneous-dependencies
import cloudinary from 'cloudinary';
import { unlinkSync } from 'fs-extra';
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import { logger } from './logger';
import config from './setup';

const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const upload = multer({ dest: './temp/' }).any('file');

export const UploadFile = async(files, publicPath, type) => {
  const array = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    cloudinaryConfig.uploader.upload(file.path, { folder: publicPath, resource_type: type }, (error, result) => {
      if (error) {
        logger.log(error, 'config:: uploader.js');
        throw error;
      }
      array.push(result.secure_url);
      unlinkSync(file.path);
    });
  }
  return array;
};
