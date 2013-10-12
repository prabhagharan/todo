var project = require('../models/projects.js');

exports.projectslist = function(req, res){
	console.log("req.params.id="+req.params.id+" req.session.userID"+req.session.userID)
	if(req.session.userID !== undefined && req.session.userID == req.params.id)
		res.render("projects");
	else
		res.render("otherprojects");
}

exports.projectdetailsjson = function(req, res){
	project.getProjectDetails(req, function(err, results){
		res.json(results);
	});
}

exports.projectslistjson = function(req, res){
	console.log("In Projects"+req.session.authenticated);
	project.getUserProjects(req, function(err, results){
		res.json(results);
	});
}

exports.addproject = function(req, res){
	console.log("req.body.UserID= "+req.body.UserID);
	project.addProject(req, function(err, results){
		console.log("results - "+results.insertId+" userid = "+req.body.UserID);
		addProjectresults = results;
		project.addProjectUserMapping(req.body.UserID, addProjectresults, function(err, results){
			res.json(addProjectresults);
		});
	});

}
exports.editproject = function(req, res){
	project.editProject(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}

exports.deleteproject = function(req, res){
	project.deleteProjectUserMapping(req, function(err, results){
		console.log("results - "+results);
		deleteProjectUserMappingresults = results;
		project.deleteProject(req, function(err, results){
			res.json(deleteProjectUserMappingresults);
		});
	});
}

