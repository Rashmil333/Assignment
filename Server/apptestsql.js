require('dotenv').config();
const express= require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const cors = require("cors");
const http=require('http').createServer(app);
require("./db/conn");
const Register=require("./models/register");
const cookieParser=require("cookie-parser");
const auth=require("./middleware/auth")
const port=process.env.PORT || 3002;


 
const staticPath=path.join(__dirname,'../public');
const templatePath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')
app.use(express.static(staticPath))
app.use(express.static(partialsPath));
app.set("view engine",'hbs');
app.set("views",templatePath);
hbs.registerPartials(partialsPath);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

console.log(process.env.SECRET_KEY);

const mysql=require("mysql");
 var connection=mysql.createConnection({
      host:"sql11.freesqldatabase.com",
    user:'sql11438206',
    password:'L4qdWL92k5',
    database:'sql11438206',
    port:3306
    });

connection.connect(function(error){
      if(!!error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    });



app.post("/sqlupdate",auth,async(req,res)=>{
  try{
    const card_no=req.body.cardno;
    const new_task=req.body.task;
    const new_descript=req.body.description;
    var UPDATE_QUERY = "UPDATE Todotable set Task =?,Description=?  WHERE Task_no =?";
    connection.query(UPDATE_QUERY,[new_task,new_descript,card_no],(err)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("Updated successfully");
         res.send("ok");
        res.end();
      
      }
    })
  }
  catch(err){
    console.log(err)
  }
})

app.post("/addtasksql",auth,async(req,res)=>{
  try{
    const task=req.body.taskname;
    const descipt=req.body.description;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const inc=(id)=>{
     const ADD_QUERY=`insert into Todotable (Task_no,Task,Time,Description,Staus) values('${id+1}','${task}','${dateTime}','${descipt}','Todo')`;
    connection.query(ADD_QUERY,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("Inserted successfully");
        res.send("ok");
        res.end();
      }
    })


    }
    const COUNT_QUERY='SELECT COUNT(*)  AS rows FROM Todotable';
    
    connection.query(COUNT_QUERY,(err,response)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("THE NUMBER OF ROWS ARE----> "+JSON.stringify(response[0].rows));
        rows=parseInt(JSON.stringify(response[0].rows));
        inc(rows);
      }
    });
    

  }

  catch(err){
    console.log(err)
  }
})
app.post("/deletetasksql",auth,async(req,res)=>{
  try{

    const card_id=req.body.taskno;
    var DELETE_QUERY = `DELETE FROM Todotable WHERE Task_no =${card_id} `;
    connection.query(DELETE_QUERY,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("Deleted Successfully ");
      }
    })


  }

  catch(err){
    console.log(err)
  }
})
app.get("/takedatasql",auth,async(req,res)=>{
  try{
    const DATA_QUERY=`select * from Todotable`;
    connection.query(DATA_QUERY,(err,response)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("Data is send successfully!");
        res.send(response);
      }
    })

  }
  catch(err){
    console.log(err);
  }
})


app.get("/index",(req,res)=>{
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.get("/logout",auth,async(req,res)=>{
  try{
    res.clearCookie("jwt");
    console.log("logout sucessfully");
    res.status(200);
    res.render("index");

  }catch(err){ 
    res.status(500).send(error);
  }
})
app.get("/secret",auth,(req,res)=>{
    console.log("the cookie jwt is"+req.cookies.jwt);
  res.render("secret");
})
app.get("/auth",auth,(req,res)=>{
    console.log("the cookie jwt is"+req.cookies.jwt);
    res.status(200).send('testing');
});

app.get("/sltest",(req,res)=>{
  res.status(200);
  res.send();
});




app.post("/register",async(req,res)=>{
  try{
    const pass=req.body.pass;
    const conpass=req.body.conpass;

    if(pass==conpass){
      const secretpass=await bcrypt.hash(pass,10);
      const registerEmployee= new Register({
        firstname:req.body.name,
        phone:req.body.phoneno,
        email:req.body.email,
        password:secretpass,
        cpassword:req.body.conpass,
        profile_status:0,
        mydepressor_status:0,
        myreliever_status:0,
        login_status:0,
        nav_cursor:""

      });
       console.log("the success part"+registerEmployee);
      const token=await registerEmployee.generateAuthToken();
      console.log("the success part"+token);
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+30000),
        httpOnly:true
      });
      console.log("the cookie is "+cookie);
      const result=await registerEmployee.save();
      res.status(200).send('Registered Successfully!!!');

    }
    else{

      res.status(400).send("Passwords are not matched.");
    }
    

  }
  catch(err){
    res.send(err)
  }
});

app.post("/login",async(req,res)=>{
  try{
    const pass=req.body.pass;
    const email=req.body.email;
    console.log(pass,email);
    const result=await Register.findOne({email:email});
    console.log("the useremail is",typeof(result));
    if(result==null){
      console.log('yes the email is null')
       res.status(201);
        res.end();
      res.json();

    }
    else{
       const check=await bcrypt.compare(pass,result.password);
        if(check==true){
       const token= await result.generateAuthToken();
      console.log("the token part of login is "+token);
      res.cookie("jwt",token,{
      expires:new Date(Date.now()+3000000000),
      httpOnly:true
      });
      res.render("index");
      res.status(200);
      const login_status=await Register.findOneAndUpdate({email:email},{$set:{login_status:1}});

    }
    else{
      res.status(400);
      res.send("sorry  email is invalid")
    }


    }
   

   
  
   
    // console.log(result.password);

  }
  catch(err){
    console.log(err)
  }
});





const securepassword=async(pass)=>{
  const result=await bcrypt.hash(pass,10);
  const check=await bcrypt.compare(pass,result);
  console.log(check);
  console.log(result);
};

securepassword("thapa@123");


const jwt=require("jsonwebtoken");

const createToken=async()=>{
  const token=await jwt.sign({_id:"60916071da02fe082c085b65"},"mynameisrashmilrajpootyoutuber",{
    expiresIn:"2 hours"
  });
  console.log(`token:${token}`);
  const userver=await jwt.verify(token,"mynameisrashmilrajpootyoutuber");
  console.log(userver);
}
createToken();


if ( process.env.NODE_ENV == "production")
  {   app.use(express.static("client/build"));
      const path = require("path");
      app.get("*", (req, res) => { 
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
   })
  }


const server=http.listen(port,()=>{
  console.log("listening at the port no 8000")
});

