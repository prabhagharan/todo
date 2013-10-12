
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();
var projects = require('./routes/projects.js');
var tasks = require('./routes/tasks.js');
var login = require('./routes/login.js');

app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('view engine','jade');
app.use(express.bodyParser());
app.use( express.cookieParser() );
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));

var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);

app.get('/user/:id',projects.projectslist);
app.get('/api/project/:id',projects.projectdetailsjson);
app.get('/api/projects/:id',projects.projectslistjson);
app.post('/api/project',projects.addproject);
app.put('/api/project/:id',projects.editproject);
app.delete('/api/project/:id',projects.deleteproject);

app.get('/project/:id',tasks.taskslist);
app.get('/api/tasks/:id',tasks.taskslistjson);
app.post('/api/tasks',tasks.addTask);
app.put('/api/tasks/:id',tasks.editTask);
app.delete('/api/tasks/:id',tasks.deleteTask);

app.get('/login',login.showLoginForm);
app.get('/logout',login.logout);
app.post('/api/signup',login.signup);
app.post('/api/authenticate',login.authenticate);

io.sockets.on('connection',function(socket){
	socket.on('taskclicked',function(data){
	io.sockets.emit('notify_admin',{'taskid':data.taskid});
	console.log(data.taskid);
	});
});
