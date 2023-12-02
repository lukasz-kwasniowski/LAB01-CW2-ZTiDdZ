# Basic-Auth Project
###1. Zaloguj się do platformy VDI
### 2. Zaktualizuj system za pomocą komendy:
```apt-get update```
### 3. Zainstaluj npm za pomocą komendy:
```sudo apt install npm ```
### 4. Zainstaluj express za pomocą komendy:
```npm install express```
### 5. Utwórz folder `basic_auth_project`
### 6. Wejdź do folderu `basic_auth_project`, utwórz plik `index.js` i utwórz folder `public`
### 7. W folderze `public` utwórz plik `index.html`
### 8. W pliku index.html powinien znaleźć się kod wyświetlajacy "Hello World"
### 9. W pliku index.js powinien znaleźć się następujący kod:
```commandline
// Requiring module
const express = require("express");
var path = require('path');

const app = express();

function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	console.log(req.headers);

	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

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
```
## 10. Abu uruchomić kod, należy użyc komendy:
```commandline
node index.js
```
