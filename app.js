

/*Postgresql*/
const { Pool, Client } = require('pg')

//create connectionString used connect to db
const connectionString = 'postgresql://postgres:Superman35770@localhost:5432/documentDB'

//create client with connectionString
const client = new Client({
  connectionString: connectionString,
})
//connect to db
client.connect()



/*Express*/
//use express modulo for node.js and create instance of express
const express = require("express");
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

//instance of express 
const app = express();

//read the request data from the frontend
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//host the files in public folder to localhost
app.use(express.static('public'));


//set up view engine with defaultLayout of main
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/mainLayouts') //dirname current dir, changed the default layout path to something unique eg. views/mainLayouts
}));
app.set('view engine', 'handlebars');


/*
render the index file into the main default layout at the / root dir */
app.get('/', (req, res) => {
	client.query('SELECT paragraph FROM document_tbl', (err, res2) => {
	//data inside column 1 (paragraph), row 0	
		const data = res2.rows[0].paragraph;
		res.render('index', {
			title: 'Notepad',
			content: data,
			style: 'styles.css',
			script: 'appPost.js'
		});	
	});
});

/*
Save button handling post request from client 
Responds to the put request on / root dir
Update the paragraph string in the db with the textarea text and render the table with the data from the table */
app.put('/', urlencodedParser, (req, res) => {
	console.log(req.body.text);
	const textAreaData = req.body.text; //textArea text
	const data = textAreaData.replace(/^\s+/g, ''); //regex textArea with leading text removed
	const id = 0;
	client.query('UPDATE document_tbl SET paragraph = $1 WHERE id = $2',[data, id], (err, res2) => {
		res.render('index', {
			title: 'Notepad',
			content: data,
			style: 'styles.css',
			script: 'appPost.js'
		});	
	});
});


//Start the localhost on port 3000
const port = 3000;

app.listen(port, () => {
 console.log("Server listening on port " + port);
});


