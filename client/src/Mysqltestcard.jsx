import React,{useState} from "react";
import Button from '@material-ui/core/Button'

const Mysqltestcard=(props)=>{
	const [card_no,setcard_no]=useState('');
	const [data,setdata]=useState([]);
	const [task,settask]=useState();
	const [descript,setdescript]=useState('');
	  const getdata=async()=>{
    
    
    const res=await fetch("/takedatasql",{
      method:"GET",
       headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
     
    });
    const data=await res.json();
    console.log(data);
    setdata(data);

   }


   const updatecard=async(e)=>{
  	if(task==''|| descript==''){
  		alert("Please fill both task and Description")

  	}
  	else{
  		 const res=await fetch("/sqlupdate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        cardno:parseInt(card_no),description:descript,task:task
      })
    });
  		 settask("");
  		 setdescript('');
  		 window.location.reload();

  	}
   
  }

	return(<>
		<div style={{display:'flex'}}>
			<input id="sqlinput" type="number" placeholder="Give the card no" value={card_no} onChange={(e)=>setcard_no(e.target.value)}/>
		<Button onClick={getdata} style={{backgroundColor:'red',color:'white'}}>Open Card</Button>
		</div>
		
		{data.map((cvalue)=>{
			console.log(cvalue.Task_no+"%%"+card_no)
			console.log(typeof(cvalue.Task_no))
			console.log(typeof(parseInt(card_no)))
			if(cvalue.Task_no==parseInt(card_no)){
				return(<>
					<div className="sqlcard">
					<p>Task_no</p>
					<h3></h3>
					<h2>{cvalue.Task_no}</h2>
					<p>{cvalue.Task}</p>
					<p style={{backgroundColor:'dodgerblue',color:'white'}}>{cvalue.Description}</p>
					<p style={{backgroundColor:'skyblue ',color:'white'}}>{cvalue.Staus}</p>
					<p style={{backgroundColor:'black',color:'white'}}>{cvalue.Time}</p>
					
				</div>
					<input id="sqlinput" type="text" placeholder="Please Update the Task" value={task} onChange={(e)=>settask(e.target.value)}/>
						<input id="sqlinput" type="text" placeholder="Please Update the Description" value={descript} onChange={(e)=>setdescript(e.target.value)}/>
		<Button onClick={updatecard} id="Dsendbut" style={{marginLeft:'10px'}}>Update</Button>
				</>)


			}
			else{

			}
		})}
	
		
	</>)
}

export default Mysqltestcard
