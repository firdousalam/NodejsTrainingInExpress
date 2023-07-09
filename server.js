const express = require('express');
const userRoute = require("./route/userRoute");
const app = express()
const port = 8001;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/user",userRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})