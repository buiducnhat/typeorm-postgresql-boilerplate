import { checkRole, checkPermission } from './check-role.middleware';
import { isAuth, isOptionalAuth } from './is-auth.middleware';
import { uploadImageByDisk, uploadImageByMemory } from './multer.middleware';
import * as validators from './validators';

export default {
  isAuth,
  isOptionalAuth,
  checkRole,
  checkPermission,
  validators,
  uploadImageByMemory,
  uploadImageByDisk,
};
