import 'reflect-metadata';
import process from 'process';
import { worker } from './worker';

const main = async () => {
  try {
    await worker();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
