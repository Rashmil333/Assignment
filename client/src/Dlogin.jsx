import React,{useState} from "react";
import {useHistory} from "react-router-dom"
import Dnavbar from "./Dnavbar";
import Button from '@material-ui/core/Button';
import Dfooter from "./Dfooter";
const image="https://thumbs.gfycat.com/DependableHeavenlyKentrosaurus-size_restricted.gif";

const Dlogin=()=>{
 
	const history=useHistory();
	const [welcome,setwelcome]=useState(false);
  const [state,setstate]=useState({
    email:"",pass:""
  });

  let name,value;
  const inputevent=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setstate({...state,[name]:value});
    console.log(state)
  }
  const postdata=async(e)=>{
  	validation();
    e.preventDefault();
    const {email,pass}=state;
    const res=await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,pass
      })
    });

   
    console.log(res.status);
    if(res.status==201){
    alert("Invalid Credentials");
    state.email="";
    state.pass="";
    }
    else if(res.status==400){
    	alert("Invalid Credentials")
    	 state.email="";
    state.pass="";
    }
    else if(res.status==500){
    setwelcome(true);
    alert("Login Successfull");
    history.push("/mysqlapp")
    window.location.reload();
  
    }
    else{
    	alert("There is some problem.Please login again!!")
    }



    
  }
	const validation=()=>{
		var email=document.getElementById('email').value;
		var password=document.getElementById('password').value;
		if(email==""){
		alert("Please enter the email!!!");
		}
		else if(password==""){
		alert("Please enter the password!!!");
		}
	}

	return(<>
		<Dnavbar/>
		
			{welcome==true?<>
			<div className="container">
				<div className="card" style={{textAlign:'center',marginTop:'20%'}}>

						<div style={{marginTop:'30%',marginLeft:'45px'}}>
							 <img src="https://64.media.tumblr.com/2e75bce29366db2538eb21444096ff42/tumblr_pkv8sniqcz1sqtg5co2_r1_1280.gifv" style={{width:'100px'}}/><br/><b>
						  <i id="text_pink">You are logged in successfully.
						  	<br/>
						  	And this cat will navigate you on which section/tab you are.
						  	We hope you will enjoy...
						  </i></b>
						  <br/><br/>

						</div>
				</div>
			</div>
				


			</>:<>
				<div className="container" style={{textAlign:'center',marginTop:'100px'}} id="formshadowdiv">
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<h1 id="text_pink">Log In</h1><br/>
					<div>
					  <form  method="POST">
						<label id="text_white">Email Id</label><br/>
						<input id="email" type="email" placeholder="lilylily333@gmail.com"  name="email" onChange={inputevent} value={state.email} className="letusinput"/><br/>
						<label id="text_white">Password</label><br/>
						<input id="password" type="password" placeholder="Minimum 8 characters with a symbol"name="pass" onChange={inputevent} value={state.pass} className="letusinput"/><br/>
						<Button id="Dsendbut" style={{float:'right'}}><input style={{background:'transparent',border:'none',fontSize:'15px'}} type="submit" value="Login" onClick={postdata}></input></Button>
 					

 							<br/><br/><br/><br/>
						<div style={{display:'flex',justifyContent:'center'}}>
							<p id="text_white">Not have an account</p>
						<Button id="text_white" id="Dsendbut" style={{marginLeft:'10px',marginTop:'-5px',width:'30px',height:'25px'}} onClick={()=>history.push('signup')}>Signup</Button>
						</div>
						
							<p id="text_white">Forgot Password?</p>
						<p id="text_pink">By joining you agree to the Terms and Privacy and Policy</p>
						
						
					  </form>
					</div>
				</div>
			</div>
		</div>

			</>}
		
		
		<Dfooter/>
		

	</>)


}

export default Dlogin;