import app from "./app.js";
import database from "./database/connection.js";
import associations from "./database/associations.js";
const port = app.get("port");

app.listen(port, () => {
  console.log("server on port", port);
  database.connect();
  associations();
});
