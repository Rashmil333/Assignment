import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import Dnavbar from "./Dnavbar";
import Button from '@material-ui/core/Button';
import Dfooter from "./Dfooter";
const image="https://thumbs.gfycat.com/DependableHeavenlyKentrosaurus-size_restricted.gif";

const Dsignin=()=>{

	 const history=useHistory();

  const [state,setstate]=useState({
    name:"",phoneno:"",email:"",pass:"",conpass:""
  });

  let name,value;
  const inputevent=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setstate({...state,[name]:value});
    console.log(state)
  }
  const postdata=async(e)=>{
  	var email=document.getElementById('email').value;
		var name=document.getElementById('name').value;
		var password=document.getElementById('password').value;
		var phone=document.getElementById('phone').value;
		var cpass=document.getElementById('cpass').value;
		if(name==""){
		alert("Please enter the name!!!");
		}
		else if(phone==""){
		alert("Please enter the phone no!!!");
		}

		else if(password==""){
		alert("Please enter the password!!!");
		}
		else if(cpass==""){
		alert("Please confirm the password!!!");
		}
		else if(email==""){
		alert("Please enter the email!!!");
		}
		else{

			 e.preventDefault();
    const {name,phoneno,email,pass,conpass}=state;
    const res=await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,phoneno,email,pass,conpass
      })
    });

    const data=await res.json();
    if(res.status==200){
    	history.push("/login");
    }

		}
   


    
  }

	const validation=()=>{
		var email=document.getElementById('email').value;
		var name=document.getElementById('name').value;
		var password=document.getElementById('password').value;
		var phone=document.getElementById('phone').value;
		var cpass=document.getElementById('cpass').value;
		if(name==""){
		alert("Please enter the name!!!");
		}
		else if(phone==""){
		alert("Please enter the phone no!!!");
		}

		else if(password==""){
		alert("Please enter the password!!!");
		}
		else if(cpass==""){
		alert("Please confirm the password!!!");
		}
		else if(email==""){
		alert("Please enter the email!!!");
		}

	}
	return(<>
		<Dnavbar/>
		
		<div className="container" style={{textAlign:'center',marginTop:'100px'}} id="formshadowdiv">
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<h1 id="text_pink">Sign In</h1><br/>
					<div>
				
						<label id="text_white">UserName</label><br/>
						<input id="name" type="text" placeholder="Full Name" name="name" onChange={inputevent} value={state.name} className="letusinput"/><br/>

						<label  id="text_white">Email Id</label><br/>
						<input id="email" type="email" placeholder="lilylily333@gmail.com" name="email" onChange={inputevent} value={state.email} className="letusinput"/><br/>

						<label id="text_white">Phone Number</label><br/>
						<input id="phone" type="number" placeholder="8965212547" name="phoneno" onChange={inputevent} value={state.phoneno} className="letusinput"/><br/>

						<label id="text_white">Password</label><br/>
						<input id="password" type="password" placeholder="Minimum 8 characters with a symbol" name="pass" onChange={inputevent} value={state.pass} className="letusinput"/><br/>

						<label id="text_white">Confirm Password</label><br/>
						<input id="cpass" type="password" placeholder="Minimum 8 characters with a symbol"  name="conpass" onChange={inputevent} value={state.conpass} className="letusinput"/><br/>
						<Button id="Dsendbut" style={{float:'right'}}><input style={{background:'transparent',border:'none',fontSize:'15px'}} type="submit" value="Sign up" onClick={postdata}></input></Button>
						<br/><br/><br/><br/>
						<div style={{display:'flex',justifyContent:'center'}}>
							<p id="text_white">Already member login</p>
						<Button id="text_white" id="Dsendbut" style={{marginLeft:'10px',marginTop:'-5px',width:'30px',height:'25px'}} onClick={()=>history.push('login')}>Login</Button>
						</div>
						
						
						<p id="text_pink">By joining you agree to the Terms and Privacy and Policy</p>
					</div>
				</div>
			</div>
		</div>
		
		
		
		<Dfooter/>
		

	</>)


}

export default Dsignin;