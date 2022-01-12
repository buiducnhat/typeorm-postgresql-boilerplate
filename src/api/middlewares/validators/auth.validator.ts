import { celebrate, Joi } from 'celebrate';

import { VIETNAMESE_PHONE_REGEX } from '@src/config/constants';

export default {
  signUp: celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(VIETNAMESE_PHONE_REGEX),
      avatar: Joi.string(),
      password: Joi.string().min(8).required(),
    }),
  }),

  signIn: celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      remember: Joi.boolean(),
    }),
  }),
};
