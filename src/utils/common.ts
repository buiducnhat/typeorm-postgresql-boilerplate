import { NextFunction } from 'express';

import Logger from '@src/loaders/logger';

export const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

export function isUrlFormat(url) {
  return urlRegex.test(url);
}

export function generateRandomKey(length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function passErrorToNext(callback: any, next: NextFunction) {
  try {
    callback();
  } catch (e) {
    Logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function generateAvatar(firstName: string, lastName = ''): Promise<string> {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
}

export function removeVietnameseAccent(str: string) {
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }
  return str;
}

export const convertDto = (dto: any, obj: any) => {
  for (const [key, value] of Object.entries(dto)) {
    obj[key] = value;
  }
};

export const AsyncForEach = async function (array: Array<any>, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
