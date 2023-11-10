import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .options('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Is the base of the table',
  })
  .options('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Is the limit of the table',
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show the table in console',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'Is the name of the file',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Is the destination of the file',
  })
  .check((argv, options) => {
    if (argv.b < 1) {
      throw 'Base must be greater than 0';
    }

    return true;
  })
  .parseSync();
