const express = require('express')
const app = express()
const port = 8001


app.get('/', (req, res) => {
    // logic
  res.send('Hello World!')
})

app.post('/post',(req,res)=>{
    // logic
   res.send("this is our post method")
})

app.delete('/delete',(req,res)=>{
    // logic
    res.send("this is our delete method")
 })

 app.put('/put',(req,res)=>{
    res.send("this is our put method")
 })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})