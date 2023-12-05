import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function dbConnect() {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`Running ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
