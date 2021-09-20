const mysql=require("mysql2/promise");



const connection= mysql.createConnection({
		host:"sql11.freesqldatabase.com",
		user:'sql11438206',
		password:'L4qdWL92k5',
		database:'sql11438206',
		port:3306
	});

console.log("connection is successfull on mysql.");
module.exports=connection;
