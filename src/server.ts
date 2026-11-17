import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async() => {
  initDB();
  
  app.listen(config.port, () => {
  console.log(`Server with ExpressJs is running on the port ${config.port}`);
});
}

main();