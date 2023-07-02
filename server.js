const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 8001

const mongoUrl = 'mongodb://TechnophileFirdous:Technophile123@ac-k5g9okb-shard-00-00.kzuwf7d.mongodb.net:27017,ac-k5g9okb-shard-00-01.kzuwf7d.mongodb.net:27017,ac-k5g9okb-shard-00-02.kzuwf7d.mongodb.net:27017/?ssl=true&replicaSet=atlas-xjy27e-shard-0&authSource=admin&retryWrites=true&w=majority';
// mongodb connection
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected!'))
  .catch((error)=>{
    console.log(error);
  })
/*
app.get('/', (req, res) => {
    // logic
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    // logic
  res.send('Hello World!')
})
app.delete('/', (req, res) => {
    // logic
  res.send('Hello World!')
})
app.post('/post',(req,res)=>{
    // logic
   res.send("this is our post method")
})
app.get('/post',(req,res,next)=>{
    // logic
   //res.send("this is our post method")
   next()
})
app.get('/post',(req,res)=>{
    // logic
   res.send("this is our 2nd post method")
})
app.delete('/delete',(req,res)=>{
    // logic
    res.send("this is our delete method")
 })

 app.put('/put',(req,res)=>{
    res.send("this is our put method")
 })
 app.use()
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})