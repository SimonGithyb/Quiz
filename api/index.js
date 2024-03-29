require('dotenv').config();
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

const routes = require('./routes/schema-routes');
const { log: wrapLog } = require("./utils/loging");


console.log = wrapLog(console.log);
console.warn = wrapLog(console.warn);
console.error = wrapLog(console.error);


const { SERVER_PORT } = process.env;

const main = async () => {
  const app = express();
  const server = require('./utils/serverStart')(app);
  
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'ui')));
  app.use(cors());

  routes(app);

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title:"CRUD app docs",
        version: "0.1",
      },
      servers: [
        {
          url: process.env.SERVER_URL
        }
      ]
    },
    apis: ["./routes/*.js"]
  };
  
  const spacs = swaggerjsdoc(options);
  app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
  );
  

  server.listen(SERVER_PORT, async () => {
    console.log(`Server started on port ${SERVER_PORT}`);
  });

}

main().catch(e => {
    console.log(e);
    process.exit(1);
});
