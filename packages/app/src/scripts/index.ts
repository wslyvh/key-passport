import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  console.log('Running scripts..');
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
