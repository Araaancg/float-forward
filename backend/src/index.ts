import 'reflect-metadata';
import process from 'process'
import { worker } from './worker'

const main = async () => {
  try {
      await worker()
    // }
  } catch (error) {
    // this gets add to the logger .json file as errors.
    console.error(error)
    process.exit(1)
  }
}

main()