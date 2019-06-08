

/*Express*/
//use express modulo for node.js, create port 3000
var express = require("express");
var app = express();
var port = 3000;

app.get("/", (req, res) => {
	res.send("You are sending data to root directory");
});


//host the files in public folder to localhost
app.use(express.static('public'));


/*Start the localhost*/
app.listen(port, () => {
 console.log("Server listening on port " + port);
});


////////////////////////////////////////////////////

/*Postgresql*/
const { Pool, Client } = require('pg')

//connect to db and create client
const connectionString = 'postgresql://postgres:Superman35770@localhost:5432/documentDB'

const client = new Client({
  connectionString: connectionString,
})
client.connect()

// display what is inside the column 'paragraph'
client.query('SELECT paragraph FROM document_tbl', (err, res) => {
  console.log(err, res)
  console.log('Par: ' + res.paragraph);
  client.end()
})


/////////////////////////////////////////////////////////////



// app.get("/documentHTML.html", (req, res) => {
// 	res.send("");
// });

