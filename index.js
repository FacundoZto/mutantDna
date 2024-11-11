const app = require("./src/server.js");
const dbConfig = require("./src/config/dbConfig.js");
const PORT = process.env.PORT || 3000;

dbConfig().then((res) => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
