const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const employeeSchema= new mongoose.Schema({
	firstname:{
		type:String,
		required:true,

	},
	phone:{
		type:Number,
		required:true,
	},
	email:{
		type:String,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Email is not valid");
			}
		}
	},
	password:{
		type:String,
		required:true,
	},
	cpassword:{
		type:String,
		required:true,
	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	chats:[{
		type:String
	}],
	receivedchats:[{
		type:String
	}],
	mydepressor:[
	{name:{
		type:String
	},
	img:{
		type:String
	},email:{
		type:String
	},phone_no:{
		type:Number
	}}
	],
	myreliever:[
	{name:{
		type:String
	},
	img:{
		type:String
	},email:{
		type:String
	},phone_no:{
		type:Number
	}}
	],
	mychats:[
		{
			type:{
				type:String
			},
			message:{
				type:String
			}
		}
	],
	total_messages:{
		type:Number
	},
	cart:[
		{
			img:{
				type:String
			},
			product_name:{
				type:String
			},
			cost:{
				type:String
			},

		}
	],
	user_problems:[
		{
			img:{
				type:String
			},
			phone:{
				type:Number
			},
			email:{
				type:String
			},
			name:{
				type:String
			},
			bank_acc:{
				type:Number
			},
			address:{
				type:String
			},
			problem:{
				type:String
			},
			nearest_restaurent:{
				type:String
			}
		}
	],
	orders:[
		{		
			 customer_name :{type:String},
             product_name :{type:String},
             cost:{type:String},
             delivery_add:{type:String},
             Mobile_no:{type:Number},
             img:{type:String},
             quantity:{type:Number}
		}
	],
	stories:[
		{		
			 img_depressor:{type:String},
			 img_reliever:{type:String},
			 story:{type:String},
			 email:{type:String},
			 category:{type:String}
		}
	],
	profile_status:{type:Number},
	profile:[
		{		
			 name:{type:String},
			 mobile_no:{type:String},
			 email_id:{type:String},
			 img:{type:String},
			 age:{type:String},
			 category:{type:String},
			 hobbies:{type:String},
			 work:{type:String},
			 description:{type:String}
		}
	],
	mydepressor_status:{type:Number},
	myreliever_status:{type:Number},
	depressors:[
		{		
			 name:{type:String},
			 mobile_no:{type:String},
			 email:{type:String},
			 img:{type:String},
			 age:{type:String},
			 category:{type:String},
			 hobbies:{type:String},
			 work:{type:String},
			 description:{type:String}
		}
	],
	relievers:[
		{		
			 name:{type:String},
			 mobile_no:{type:String},
			 email:{type:String},
			 img:{type:String},
			 age:{type:String},
			 category:{type:String},
			 hobbies:{type:String},
			 work:{type:String},
			 description:{type:String}
		}
	],
	login_status:{type:Number},
	both:[
		{		
			 name:{type:String},
			 mobile_no:{type:String},
			 email:{type:String},
			 img:{type:String},
			 age:{type:String},
			 category:{type:String},
			 hobbies:{type:String},
			 work:{type:String},
			 description:{type:String}
		}
	],
	 photooo: {
        type: String
    },
    memory:[]



});

employeeSchema.methods.generateAuthToken= async function(){
	try{
		console.log(this._id);
		const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
		this.tokens=this.tokens.concat({token:token})
		await this.save();
		return token;
	}
	catch(err){
		console.log(err)
	}
}

const Register = new mongoose.model("Register",employeeSchema);

module.exports=Register;