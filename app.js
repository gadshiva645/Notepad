
/*Express*/
//use express modulo for node.js and create instance of express
var express = require("express");
var app = express();

//get request to root dir
app.get("/", (req, res) => {
	res.send("You are sending data to root directory");
});


//host the files in public folder to localhost
app.use(express.static('public'));


//Start the localhost on port 3000
var port = 3000;

app.listen(port, () => {
 console.log("Server listening on port " + port);
});


////////////////////////////////////////////////////

/*Postgresql*/
const { Pool, Client } = require('pg')

//create connectionString used connect to db
const connectionString = 'postgresql://postgres:Superman35770@localhost:5432/documentDB'

//create client with connectionString
const client = new Client({
  connectionString: connectionString,
})
client.connect()

// display what is inside the column 'paragraph'
client.query('SELECT paragraph FROM document_tbl', (err, res) => {
  console.log(res.rows[0]);
  client.end()
});



/////////////////////////////////////////////////////////////



// app.get("/documentHTML.html", (req, res) => {
// 	res.send("");
// });
