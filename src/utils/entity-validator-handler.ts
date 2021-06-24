import Joi, { ValidationError, BasicType } from 'joi';
import StatusCodes from 'http-status-codes';
import { schemas, KeyofSchemas } from './joi-schemas';
import HttpError from './error-http';

type ErrType = ValidationError;
type ValueType = BasicType;

export const validate = (entity: KeyofSchemas, value: ValueType): void => {
  try {
    Joi.assert(value, schemas[entity]);
  } catch (err) {
    const message = JSON.stringify(
      (err as ErrType).details.map((e) => {
        const { path, message: mess } = e;
        return { path, message: mess };
      }),
    );

    throw new HttpError({
      message,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }
};
