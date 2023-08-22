require ("dotenv").config
const express = require ("express");
const lodash = require("lodash");
const mongoose  = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
origin:'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({
    extended: true
  }));
// app.use(bodyParser.json())
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema ={
  name:String
};

const Item = mongoose.model("Item",itemsSchema) 

app.get('/',async (req,res)=>{
    let result = await Item.find({});
    // console.log(result);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    // Pass to next layer of middleware
 //    next();
    res.send(result).status (200);
})
.post("/",async (req,res) => {
    const task = req.body.task
    console.log(task)
    const newTask = await new Item({
        name: task
    });
    // console.log(req.body.task)
    
    // const newTask = req.body.name;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   
//    next();
    
newTask.save().then(()=>{
    res.redirect("/");
}).catch((err) =>{
    console.log(err)
})
})
.delete('/',async(req,res) =>{'/'
    const id = req.body.id
    // console.log(id)
    const item = await  Item.findByIdAndDelete({_id:id})
    // console.log(item.name)
    // Item.find({_id:id}).then(async(err,item)=>{
    //     console.log(item)
    // })

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
//    console.log(item)
    
res.send(item)
})
.listen(5000,function(){
    console.log('server is running on port 5000')
})