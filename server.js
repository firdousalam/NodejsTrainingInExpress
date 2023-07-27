const express = require('express');
const userRoute = require("./route/userRoute");
const commonFunction = require("./utils/commonFunction")
var CronJob = require('cron').CronJob;
const app = express()
const port = 8001;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/user",userRoute);

var job = new CronJob(
  '10 59 12 * * *',
  function() {
    console.log('You will see this message every second'+new Date());
    commonFunction.cleanLoggerFile();
  },
  null,
  true,
  'Asia/Kolkata'
);
// job.start() - See note below when to use this
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})