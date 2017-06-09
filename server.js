var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var controller = require('./controllers/subject.js');

var port     = process.env.PORT || 8002;

var path = require('path');

var app      = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/public', express.static(__dirname + '/public/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/views', express.static(__dirname + '/views'));

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// required for passport
app.use(session({
	secret: 'isalwaysrunningsecret',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app,passport); // load our routes and pass in our app and fully configured passport


app.use('',router);

router.route('/subjects')
.get(controller.allSubjects);

router.route('/subjects/:id')
.get(controller.findSubject);

// launch ======================================================================
app.listen(port);
console.log('Running on port ' + port);
