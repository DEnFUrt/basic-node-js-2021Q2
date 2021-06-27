import StatusCodes from 'http-status-codes';
import { IUserResponse, ILoginBodyParser, IUser } from '../../common/interfaces';
import { getUserByLogin } from '../users/user-service';
import { createToken } from '../../utils-crypto/token-helper';
import { chechkPassword } from '../../utils-crypto/hash-helper';

const { OK, FORBIDDEN } = StatusCodes;

export const signToken = async (props: ILoginBodyParser): Promise<IUserResponse | {
	token: string;
}> => {
	const { login: reqLogin, password: reqPassword } = props;

	const result = await getUserByLogin(reqLogin);
	const { statusCode, sendMessage } = result;
	
	if (statusCode !== OK) {
    return result;
  }

	const { id, login, password: hashedPassword } = sendMessage as IUser;

	const resultReconciling = await chechkPassword(reqPassword, hashedPassword);

	if (resultReconciling !== true) {
		return {
      statusCode: FORBIDDEN,
      sendMessage: `User not found: The user with login: ${reqLogin} was not found`,
    };
	}

	const token = await createToken({id, login }) as string;

	return { token };
};

// export { signToken };
