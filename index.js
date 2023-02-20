const app = require("./app");
const { connectDatabase } = require("./config/database");
require("dotenv").config({ path: "config/config.env" });
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server has been started at http://localhos:${process.env.PORT}`);
});
