import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import middlewares from '@src/api/middlewares';
import ImageService from '@src/services/image.service';
import { BadRequestException } from '@src/config/custom-error.config';

const route = Router();

export default (app: Router) => {
  app.use('/images', route);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.uploadImageByDisk.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imageServiceInstance = Container.get(ImageService);

        const image = req.file;
        if (!image) {
          next(new BadRequestException('uploadImage', 'Invalid image'));
        }

        const { folder }: { folder: string } = req.body;
        const result = await imageServiceInstance.upload(image.path, folder);
        return res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    },
  );
};
