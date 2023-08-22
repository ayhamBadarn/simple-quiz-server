require(`dotenv`).config({ path: `./config.env` });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(` Uncaught Exception  Shutting down ... `);
  process.exit(1);

});

const app = require(`./app`);
const db = require('./db/dbConnection')
// env values
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



process.on('beforeExit', (code) => {
  db.end((err) => {
    console.log('end ', err)
  })
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`Unhandled Rejection Shutting down ... `);
  server.close(() => {
    process.exit(1);
  });
});
