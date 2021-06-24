import Joi from 'joi';

export const schemas = {
  uuidID: Joi.string()
    .guid({
      version: ['uuidv4', 'uuidv5'],
    })
    .allow(null),

  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().min(3).max(50).required(),

      password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^&*])(?=.{8,})'))
        .required(),

      login: Joi.string().min(3).max(50).required(),
    }),

  board: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string().min(1).max(200).required(),

      columns: Joi.array().items({
        title: Joi.string().min(1).max(100).required(),
        order: Joi.number().required(),
      }),
    }),

  task: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string().min(1).max(100).required(),

      order: Joi.number().required(),

      description: Joi.string().min(1).max(1000).required(),
    }),
};

export type KeyofSchemas = keyof typeof schemas;
