const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql= require("mysql2");


const app = express();
app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'krishika',
    database:'restaurant',
    port:3306
});
 //check database connection

db.connect(err=>{   
    if(err){console.log(err,'err');}
    console.log('database connected');
});


//get all data

app.get('/resto',(req,res)=>{
    let qr=`select * from resto`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all restaurant data',
                data:result
            })
        }
    })
});

//get single data

app.get('/resto/:id',(req,res)=>{
    let gID=req.params.id;
    let qr=`select * from resto where restid= ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send({
                message:'get Single data',
                data:result
            });
        }
        else{
            res.send({
                message:'not found',
            });   
        }
    })
});

//post data

app.post('/resto',(req,res)=>{
 console.log(req.body,'createdata');
 let name=req.body.name;
 let address=req.body.address;
 let mobile=req.body.mobile;
 let email=req.body.email;
 // let id=req.body.restid;
 // console.log('id is:',id);
 let qr=`insert into resto(name,address,mobile,email) 
 values('${name}','${address}','${mobile}','${email}')`;
 db.query(qr,(err,result)=>{
    if(err){console.log(err);}
    console.log(result,'result')
    res.send({
        message:'data inserted',
    });

  });
});

//update data(put)

app.put('/resto/:id',(req,res)=>{
    console.log(req.body,'updateddata');

    // let gID=req.body.restid;
    let Name=req.body.name;
    let Address=req.body.address;
    // let Mobile=req.body.mobile;
    let email=req.body.email;
    let Id=req.body.restid;
   

  let qr =`update resto set name='${Name}',address='${Address}',email='${email}',restid='${Id}'
  where restid=${Id}`;
 
     db.query(qr,(err,result)=>{
     if(err){console.log(err);}
    
            res.send({
                message:'data updated'
            });
     });
  });


  //delete data

  app.delete('/resto/:id',(req,res)=>{
    let gID=req.params.id;
    let qr=`delete from resto where restid= ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
               res.send({
                message:'data deleted',
            });   
        
    });
});





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
 