

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

//instance of express 
const app = express();


//host the files in public folder to localhost
app.use(express.static('public'));


//set up view engine with defaultLayout of main
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/mainLayouts') //dirname current dir, changed the default layout path to something unique eg. views/mainLayouts
}));
app.set('view engine', 'handlebars');


/*
render the index file into the main default layout at the / root dir
set html title to notepad */
app.get('/', (req, res) => {
	client.query('SELECT paragraph FROM document_tbl', (err, res2) => {
	//data inside column 1 (paragraph), row 0	
		const data = res2.rows[0].paragraph;
		res.render('index', {
			title: 'Notepad',
			content: data,
			style: 'styles.css'
		});	
	});
});

/*
////////////////////////////////////////////////////////////////
need to handle put request from client in backend
////////////////////////////////////////////////////////////////
*/


//Start the localhost on port 3000
const port = 3000;

app.listen(port, () => {
 console.log("Server listening on port " + port);
});


