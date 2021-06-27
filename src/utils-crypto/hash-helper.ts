import * as bcrypt from 'bcrypt';
import { SOLT_ROUNDS } from '../common/config';

export const hashByPassword = async (password: string | Buffer): Promise<string> => {
    const result = await bcrypt.hash(password, SOLT_ROUNDS);

    return result;
};

export const chechkPassword = async (password: string | Buffer, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash);

    return result;
};
