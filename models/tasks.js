var db = require('./dbconfig.js');

exports.getProjectTasksList = function(req, callback){
	var projectID = req.params.id;
	var query = 'select * from todo_tasks where project_id = '+projectID;
	db.connection.query(query, callback);
}

exports.addTask = function(req, callback){
	var taskTitle = req.body.TaskTitle;
	var taskDesc = req.body.TaskDesc;
	var projectID = req.body.ProjectID;		
	var query = 'INSERT INTO todo_tasks (project_id, task_title, task_description) values ("'+projectID+'","'+taskTitle+'","'+taskDesc+'")';
	console.log(query);
	db.connection.query(query, callback);
}

exports.editTask = function(req, callback){
	var id = req.body.TaskID;
	var taskTitle = req.body.TaskTitle;
	var taskDescp = req.body.TaskDesc;
	var query = 'UPDATE todo_tasks SET task_title="'+taskTitle+'", task_description="'+taskDescp+'" WHERE task_id='+id;
	console.log(query);
	db.connection.query(query, callback);
}

exports.deleteTask = function(req, callback){
	var id = req.params.id;
	var query = 'DELETE FROM todo_tasks WHERE task_id="'+id+'"';
	console.log(query);
	db.connection.query(query, callback);
}

exports.checkUserToProject = function(req, callback){
	var userid = req.session.userID;
	var projectid = req.params.id;
	var query = 'SELECT * FROM todo_project_user_mapping WHERE user_id = "'+userid+'" AND project_id = "'+projectid+'"';
	console.log(query);
	db.connection.query(query, callback);
}
