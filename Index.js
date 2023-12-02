
//importowanie modułów
const express = require("express");
var path = require('path');

//inicjalizacja aplikacji express
const app = express();

//tworzenie funkcji do uwierzytelniania
function authentication(req, res, next) 
{
    //Logika uwierzytelniania
	var authheader = req.headers.authorization;
	console.log(req.headers);

    //sprawdzenie nagłówka autoryzacji
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

    //dedykowanie danych uwierzytelniających
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];


    //sprawdzanie poprawności danych
	if (user == '' && pass == '') {

		// If Authorized user
		next();
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen((3000), () => {
	console.log("Server is Running");
})