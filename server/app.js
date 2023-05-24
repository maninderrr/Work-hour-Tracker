const db = require("./models");
const make_app = require('./make_app')

const app = make_app.init(db)

const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
