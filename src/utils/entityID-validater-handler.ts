import { validate } from './entity-validator-handler';

export const idUuidValidator = (arrUuid: string[]): void => {
  if (arrUuid.length > 0) {
    arrUuid.map((item) => validate('uuidID', item));
  }
};
