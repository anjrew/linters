// IMPORTS
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const chalk = require('chalk');
const path = require('path');
const print = require('./utils/print');
const routes = require('./routers/routes');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

const routers = [
    require('./routers/friends-wannabes'),	
    require('./routers/accept-friendship'),
    require('./routers/end-friendship'),	
    require('./routers/friend_button'),
    require('./routers/log_out'),
    require('./routers/users'),
    require('./routers/other_user'),
    require('./routers/update'),
    require('./routers/user'),
    require('./routers/register'),
    require('./routers/upload'),
    require('./routers/login')
];

global.appRoot = path.resolve(__dirname);

// sets rendering
app.use(cookieParser());

// Very important to get the POST reests of forms
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const cookieSessionMiddleWare = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleWare);

io.use(function(socket, next) {
    cookieSessionMiddleWare(socket.request, socket.request.res, next);
    print.success(`socket with the id ${socket.id} is now connected`);
    // Emit sends data to the client
    socket.emit('connected', {
        message: 'You are connected to the server via socket.io'
    });

    socket.on('disconnect', function() {
        print.error(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('new-message', async(data) => {
        try {
            const messages = await db.saveChatMessage(data.message);
            io.sockets.emit('new-message', {
                message: data.message
            });

        } catch (e) {
            print.error(`The server had an error with a new chat message: `, e);
        }
    });
    // Emit sends data to the client
    // socket.emit('welcome', {
    //     message: 'Welome. It is nice to see you'
    // });
	
    // Relays the message to all sockets
});



app.use(express.static(`${__dirname}/public`));

app.use(csurf());

// SECURTIY
app.use((req, res, next) => {
    console.log(chalk.green(`Token is : ${req.csrfToken()}`));
    res.cookie('mytoken', req.csrfToken());
    res.setHeader('X-FRAME-OPTIONS', 'DENY');
    next();
});

app.use((req, res, next) => {
    console.log(chalk.bgBlue(`Recieve ${req.method} to ${req.url}`));
    next();
});

app.use((req, res, next) => {
    console.log(chalk.blue(`Cookie session variables: `), req.session);
    next();
});


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(...routers);

// Direct the user to the welcome screen if they are not logged in
// If there is a user ID the user must be logged in.
app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        print.warning('Redirecting to home');
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {
    if (!req.session.userId){
        print.warning('Redirecting to welcome');
        res.redirect(routes.welcome);
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});


