import React,{useState,useEffect} from "react";
import Dnavbar from "./Dnavbar";
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Mysqltestcard from "./Mysqltestcard";
import Mysqltestall from "./Mysqltestall";
const Mysqltest=()=>{

	const [task,settask]=useState();
	const [data_,setdata]=useState([]);
	const [toggle,settoggle]=useState(false);
	const [card_no,setcard_no]=useState(0);
	const [descript,setdescript]=useState('');
	const [status,setstatus]=useState('ToDo');
	const [controller,setcontroller]=useState(3);;
	const [carddata,setcarddata]=useState([]);
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


  const postdata=async(e)=>{
  	if(task==''|| descript==''){
  		alert("Please fill both task and Description")

  	}
  	else{
  		setdata((olddata)=>{
  			return([...olddata,{
  				 Task:task,
  				 Task_no:olddata.length+1
  			}])
  		})
  		 const res=await fetch("/addtasksql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        taskname:task,description:descript
      })
    });
  		 settask("");
  		 setdescript('')

  	}
   
  }

  const deletecard=async(e)=>{
  	if(card_no==''){
  		alert("Please select a card to delete!!!")
  	}
  	else{
  	setdata((olditem)=>{
			return olditem.filter((arrelem,index)=>{
				return arrelem.Task_no!==card_no;
			})
		})
  		 const res=await fetch("/deletetasksql",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        taskno:card_no
      })
    });
    window.location.reload();

  	}
   
  }

  useEffect(()=>{
  	getdata();
  },[])

	return(<>
		{/*<input type="text" placeholder="task" value={task} onChange={(e)=>settask(e.target.value)}/>
		<button onClick={postdata}>Add</button>
		<button onClick={getdata}>getdata</button>*/}
	{/*	{data_.map((cvalue)=>{
			return(<>
				<p id="text_white">{cvalue.Task_no}----->{cvalue.Task}</p>
			</>)
		})}*/}
		<Dnavbar/>
			<Button onClick={()=>settoggle(!toggle)}><SettingsIcon id="text_white"/><span id="text_white">TodoController</span></	Button><br/>
				<div className="container">
				<div className="row">
				{
					toggle==true?
						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3" id="sqlsidebar" >
						<Button id="Dsendbut" onClick={()=>setcontroller(1)}> Get single todo item </Button><br/>
						<Button id="Dsendbut" onClick={()=>setcontroller(2)}>Get all the todo items</Button><br/>
						<Button id="Dsendbut" onClick={()=>setcontroller(3)}>Create
						</Button><br/>
						<Button id="Dsendbut" onClick={()=>setcontroller(1)}>Update
						</Button><br/>
						<Button id="Dsendbut" onClick={()=>setcontroller(3)}>Home
						</Button><br/>
						<Button id="Dsendbut" onClick={deletecard}>Delete a todo item</Button>
					
						
					</div>
					:null
				}
				
					<div className="col-xl-9 col-lg-9 col-md-12 col-sm-9 col-9" >
					<p className="info_line" id="text_white">Please select the Card by clicking it and use Todocontroller(On the left corner) to edit it.</p>
					<h1 id="text_white">Home/Create	</h1>
						<p  style={{backgroundColor:'white',color:'black'}}>Note:For deleting the card first go to Home and then select an item and then
						click on "Delete a todo item" to delete it.</p>
					{
						controller==3?<>
							<div>
					<div style={{display:'flex'}}>
					<div>
						<input id="sqlinput" type="text" placeholder="Please Add the Task" value={task} onChange={(e)=>settask(e.target.value)}/>
						<input id="sqlinput" type="text" placeholder="Please Add the Description" value={descript} onChange={(e)=>setdescript(e.target.value)}/>
					</div>


							
							<Button onClick={postdata} style={{backgroundColor:'red'}}><AddIcon id="text_white"/></Button>
							
					</div><br/>
					{data_.map((cvalue)=>{
			return(<>
					{card_no==cvalue.Task_no?
						<div className="sqlcardselected" onClick={()=>{setcard_no(cvalue.Task_no)}}>
					<p>Task_no</p>
					<h3>{cvalue.Task_no}</h3>
					<h2>{cvalue.Task}</h2>
					
				</div>
						:
					<div className="sqlcard" onClick={()=>setcard_no(cvalue.Task_no)}>
					<p>Task_no</p>
					<h3>{cvalue.Task_no}</h3>
					<h2>{cvalue.Task}</h2>
					
				</div>}
				
				

			</>)
		})}*/}
					</div>
					
							

						</>:
						controller==1?<Mysqltestcard />
						:
						controller==2?
						<Mysqltestall/>:
						null
					}
				
					</div>
					
				</div>
				</div>
			
		
	</>)
}

export default Mysqltest;
// <p id="text_white">{cvalue.Task_no}----->{cvalue.Task}</p>