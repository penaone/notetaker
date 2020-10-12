const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => console.log('app listening on PORT:' + PORT))