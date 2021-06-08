import fs from 'fs';
import { promisify } from 'util';
import ph from 'path';
import { stdout, stderr } from 'process';
import {
  DIR_LOG,
  ERROR_LOG,
  INFO_LOG,
  LOG_REWRITE_EVERY_DAY,
  LOG_REWRITE_OVERSIZE,
} from '../common/config';

const fsStat = promisify(fs.stat);
const fsRename = promisify(fs.rename);
const fsMkdir = promisify(fs.mkdir);
const fsAccess = promisify(fs.access);

type StreamsWriteFunc = (message: string) => void;
type PropsRenameFileFunc = { pathFile: string; nameFile: string; dir: string };

const renameFile = async ({ pathFile, nameFile, dir }: PropsRenameFileFunc): Promise<void> => {
  try {
    await fsRename(
      pathFile,
      `${ph.format({
        dir,
        base: nameFile,
      })}`,
    );
  } catch (e) {
    throw Error(e);
  }
};

const reCreateFileLog = async (pathFile: string): Promise<void> => {
  const { dir, base } = ph.parse(pathFile);
  const stats = await fsStat(pathFile);

  if (LOG_REWRITE_EVERY_DAY) {
    const birthDate = new Date(stats.birthtimeMs).getDate();
    const currentDate = new Date().getDate();
    const dateStamp = stats.birthtime.toLocaleDateString();

    if (currentDate !== birthDate) {
      const nameFile = `${dateStamp}_${base}`;
      await renameFile({ pathFile, nameFile, dir });

      return;
    }
  }

  if (LOG_REWRITE_OVERSIZE !== 0 && stats.size > LOG_REWRITE_OVERSIZE) {
    const dateStamp = stats.birthtime.toLocaleDateString();
    const timeStamp = stats.birthtime.toLocaleTimeString().split(':');
    const nameFile = `${dateStamp}_${timeStamp.join('-')}_${base}`;
    await renameFile({ pathFile, nameFile, dir });
  }
};

const createDir = async (pathDir: string): Promise<void> => {
  try {
    await fsMkdir(pathDir, { recursive: true });
  } catch (e) {
    throw Error(e);
  }
};

const createWritable = (pathFile: string): fs.WriteStream =>
  fs.createWriteStream(pathFile, {
    encoding: 'utf8',
    flags: 'a',
  });

const accessFile = async (pathFile: string): Promise<fs.WriteStream | null> => {
  try {
    // eslint-disable-next-line no-bitwise
    await fsAccess(pathFile, fs.constants.F_OK | fs.constants.W_OK);
    await reCreateFileLog(pathFile);
  } catch (e) {
    switch (true) {
      case (e as NodeJS.ErrnoException).code === 'ENOENT':
        try {
          await createDir(DIR_LOG);
        } catch (err) {
          stderr.write(`Directory "${DIR_LOG}" creation error: ${(err as Error).message} /n`);
          stderr.write(`The log file: "${pathFile}" does not exist /n`);
          return null;
        }
        break;

      case (e as NodeJS.ErrnoException).code === 'EPERM':
        stderr.write(`The log file: "${pathFile}" is read-only /n`);
        return null;

      case (e as NodeJS.ErrnoException).code === 'EACCES':
        stderr.write(`The log file: "${pathFile}" is permission denied /n`);
        return null;

      default:
        stderr.write(`${(e as NodeJS.ErrnoException).message} /n`);
        return null;
    }
  }

  const stream = createWritable(pathFile);
  return stream;
};

const streamErrLog: StreamsWriteFunc = async (message) => {
  const stream = await accessFile(`${DIR_LOG}/${ERROR_LOG}`);
  if (stream !== null) {
    stream.write(message);
    stream.end();
  }
};

const streamInfoLog: StreamsWriteFunc = async (message) => {
  const stream = await accessFile(`${DIR_LOG}/${INFO_LOG}`);

  if (stream !== null) {
    stream.write(message);
    stream.end();
  }
};

const streamConsLog: StreamsWriteFunc = (message) => {
  const stream = stdout;
  stream.write(message);
};

export { streamConsLog, streamErrLog, streamInfoLog };
