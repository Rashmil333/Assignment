import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button'

const Mysqltestall=(props)=>{
	const [card_no,setcard_no]=useState();
	const [data,setdata]=useState([]);
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

   useEffect(()=>{
   	getdata();
   })
	return(<>
		
		{data.map((cvalue)=>{
				return(
					<div className="sqlcard">
					<p>Task_no</p>
					
					<h2>{cvalue.Task_no}</h2>
					<p>{cvalue.Task}</p>
					<p style={{backgroundColor:'dodgerblue',color:'white'}}>{cvalue.Description}</p>
					<p style={{backgroundColor:'skyblue ',color:'white'}}>{cvalue.Staus}</p>
					<p style={{backgroundColor:'black',color:'white'}}>{cvalue.Time}</p>
					
				</div>)


			
	
		})}
		
	</>)
}

export default Mysqltestall
