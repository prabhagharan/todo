var db = require('./dbconfig.js');

exports.getUserProjects = function(req, callback){
	var userID = req.params.id;
	console.log(userID);
	var query = 'select * from todo_projects tp, todo_project_user_mapping tpum where tp.project_id = tpum.project_id AND tpum.user_id ='+userID;
	db.connection.query(query, callback);
}

exports.getProjectDetails = function(req, callback){
	var id = req.params.id;
	var query = 'select * from todo_projects where project_id='+id;
	db.connection.query(query, callback);
}

exports.addProject = function(req, callback){
	var projectname = req.body.Projectname;
	var query = 'INSERT INTO todo_projects (project_name) values ("'+projectname+'")';
	console.log(query);
	db.connection.query(query, callback);
}

exports.addProjectUserMapping = function(userid, addProjectresults, callback){
	var projectid = addProjectresults.insertId;
	var query = 'INSERT INTO todo_project_user_mapping (user_id, project_id) values ("'+userid+'","'+projectid+'")';
	console.log(query);
	db.connection.query(query, callback);
}

exports.editProject = function(req, callback){
	var id = req.body.id;
	var projectname = req.body.ProjectName;
	var projectDesc = req.body.ProjectDesc;
	if(projectDesc == undefined)
	var query = 'UPDATE todo_projects SET project_name="'+projectname+'" WHERE project_id='+id;
	else
	var query = 'UPDATE todo_projects SET project_name="'+projectname+'", project_description="'+projectDesc+'" WHERE project_id='+id;
	console.log(query);
	db.connection.query(query, callback);
}

exports.deleteProject = function(req, callback){
	var id = req.params.id;
	var query = 'DELETE FROM todo_projects WHERE project_id="'+id+'"';
	console.log(query);
	db.connection.query(query, callback);
}

exports.deleteProjectUserMapping = function(req, callback){
	var id = req.params.id;
	var userid = req.session.userID;
	var query = 'DELETE FROM todo_project_user_mapping WHERE project_id="'+id+'" AND user_id="'+userid+'"';
	console.log(query);
	db.connection.query(query, callback);
}

