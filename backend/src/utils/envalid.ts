import { cleanEnv, port, str } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  SECRET: str()
});

export default env;
