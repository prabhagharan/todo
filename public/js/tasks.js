$(function () {
	var path = window.location.pathname;
	var pathArray = path.split('/');
	function loadProjectInfo(){
		$.getJSON('../api/project/'+pathArray[2],function(data){
			$.each(data, function(index, item){
				var projectName = item.project_name;
				var projectDesc = item.project_description;
				$('#project-details').append('<h3>'+projectName+'</h3><p>'+projectDesc+'</p>');
				$('#project-edit-delete').append('<a href="#" class="edit-project-details" data-id="'+pathArray[2]+'">Edit</a>');
				$('#project-details-edit-form').append('<div class="control-group"><input type="text" placeholder="Project Name" class="input-xxlarge" id="edit-projectname" value="'+projectName+'"></div><div class="control-group"><textarea rows="5" id="edit-projectdesc" class="input-xxlarge" placeholder="Task Description">'+projectDesc+'</textarea></div><div class="control-group"><a href="#" class="btn btn-primary save-edited-project-details" data-id="'+pathArray[2]+'">Save</a><a href="#" class="btn cancel-edited-project-details" data-id="'+pathArray[2]+'">Cancel</a></div>');
			});
		});		
	}
	function loadTasks(){
		$.getJSON('../api/tasks/'+pathArray[2],function(data){
			$.each(data, function(index, item){
				var taskID = item.task_id;
				var tasktitle = item.task_title;
				var taskDesc = item.task_description;
				$('#project-tasks-list').append('<div id="task-display-area-'+taskID+'"><div class="accordion-group"><div class="accordion-heading"><div class="accordion-toggle"><div class="row-fluid"><div class="span10"><a data-toggle="collapse" data-parent="#project-tasks-list" href="#task-no-'+taskID+'">'+tasktitle+'</a></div><div class="span2"><button type="button" class="btn btn-success pull-right">Done</button><div class="span12"><div class="pull-right"><a data-id="'+taskID+'" href="#" class="edit-task-details">Edit </a><a data-id="'+taskID+'" href="#" class="delete-task-details">Delete</a></div></div></div></div></div></div><div id="task-no-'+taskID+'" class="accordion-body collapse"><div class="accordion-inner">'+taskDesc+'<div class="span12"><div class="pull-right"><a href="#">Comment</a></div></div></div></div></div></div><div class="hide" id="task-edit-area-'+taskID+'"><div class="control-group"><input type="text" placeholder="Task Name" class="input-xxlarge" id="edit-taskname-'+taskID+'" value="'+tasktitle+'"></div><div class="control-group"><textarea rows="5" class="input-xxlarge" placeholder="Task Description" id="edit-taskdesc-'+taskID+'">'+taskDesc+'</textarea></div><div class="control-group"><a href="#" class="btn btn-primary save-edited-task" data-id="'+taskID+'">Save</a><a href="#" class="btn cancel-edited-task" data-id="'+taskID+'">Cancel</a></div></div>');
			});
		});
	}

	$('body').on('click','.edit-project-details',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		console.log(projectID);
		$('#project-details').hide();
		$('#project-edit-delete').hide();
		$('#project-details-edit-form').show();
	});

	$('body').on('click','.cancel-edited-project-details',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		console.log(projectID);
		$('#project-details').show();
		$('#project-edit-delete').show();
		$('#project-details-edit-form').hide();
	});

	$('body').on('click','.save-edited-project-details',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		projectName = $('#edit-projectname').val();
		projectDesc = $('#edit-projectdesc').val();
		$.ajax({
			type:"PUT",
			url:"../api/project/"+projectID,
			data:{id: projectID,ProjectName: projectName,ProjectDesc: projectDesc},
			success: function(){
				$('#project-details').html('<h3>'+projectName+'</h3><p>'+projectDesc+'</p>');
				$('#project-edit-delete').html('<a href="#" class="edit-project-details" data-id="'+projectID+'">Edit </a>');
				$('#project-details-edit-form').html('<div class="control-group"><input type="text" placeholder="Project Name" class="input-xxlarge" id="edit-projectname" value="'+projectName+'"></div><div class="control-group"><textarea rows="5" id="edit-projectdesc" class="input-xxlarge" placeholder="Task Description">'+projectDesc+'</textarea></div><div class="control-group"><a href="#" class="btn btn-primary save-edited-project-details" data-id="'+projectID+'">Save</a><a href="#" class="btn cancel-edited-project-details" data-id="'+projectID+'">Cancel</a></div>');			
				$('#project-details').show();
				$('#project-edit-delete').show();
				$('#project-details-edit-form').hide();					
			}
		});
	});

	$('body').on('click','#add-task',function(e){
		e.preventDefault();
		$('#add-project-form').show();
	});

	$('body').on('click','.cancel-new-task',function(e){
		e.preventDefault();
		$('#add-project-form').hide();
	});

	$('body').on('click','.save-new-task',function(e){
		e.preventDefault();
		tasktitle= $('#new-projectname').val();
		taskDesc= $('#new-projectDesc').val();
		projectid= pathArray[2];
		$.ajax({
			type:"POST",
			url:"../api/tasks/",
			data:{ProjectID: projectid,TaskTitle: tasktitle,TaskDesc: taskDesc},
			success: function(responseText){
				taskID = responseText.insertId;
				$('#project-tasks-list').append('<div id="task-display-area-'+taskID+'"><div class="accordion-group"><div class="accordion-heading"><div class="accordion-toggle"><div class="row-fluid"><div class="span10"><a data-toggle="collapse" data-parent="#project-tasks-list" href="#task-no-'+taskID+'">'+tasktitle+'</a></div><div class="span2"><button type="button" class="btn btn-success pull-right">Done</button><div class="span12"><div class="pull-right"><a data-id="'+taskID+'" href="#" class="edit-task-details">Edit </a><a data-id="'+taskID+'" href="#" class="delete-task-details">Delete</a></div></div></div></div></div></div><div id="task-no-'+taskID+'" class="accordion-body collapse"><div class="accordion-inner">'+taskDesc+'<div class="span12"><div class="pull-right"><a href="#">Comment</a></div></div></div></div></div></div><div class="hide" id="task-edit-area-'+taskID+'"><div class="control-group"><input type="text" placeholder="Task Name" class="input-xxlarge" id="edit-taskname-'+taskID+'" value="'+tasktitle+'"></div><div class="control-group"><textarea rows="5" class="input-xxlarge" placeholder="Task Description" id="edit-taskdesc-'+taskID+'">'+taskDesc+'</textarea></div><div class="control-group"><a href="#" class="btn btn-primary save-edited-task" data-id="'+taskID+'">Save</a><a href="#" class="btn cancel-edited-task" data-id="'+taskID+'">Cancel</a></div></div>');	
				$('#add-project-form').hide();			
				$('#new-projectname').val('');
				$('#new-projectDesc').val('');
			}
		});
	});

	$('body').on('click','.edit-task-details',function(e){
		e.preventDefault();
		taskID = $(this).data('id');
		console.log(taskID);
		$('#task-edit-area-'+taskID).show();
		$('#task-display-area-'+taskID).hide();
	});

	$('body').on('click','.cancel-edited-task',function(e){
		e.preventDefault();
		taskID = $(this).data('id');
		console.log(taskID);
		$('#task-edit-area-'+taskID).hide();
		$('#task-display-area-'+taskID).show();
	});

	$('body').on('click','.save-edited-task',function(e){
		e.preventDefault();
		taskID= $(this).data('id');
		tasktitle= $('#edit-taskname-'+taskID).val();
		taskDesc= $('#edit-taskdesc-'+taskID).val();
		projectid= pathArray[2];
		$.ajax({
			type:"PUT",
			url:"../api/tasks/"+taskID,
			data:{TaskID: taskID,TaskTitle: tasktitle,TaskDesc: taskDesc},
			success: function(){
				$('#task-display-area-'+taskID).html('<div class="accordion-group"><div class="accordion-heading"><div class="accordion-toggle"><div class="row-fluid"><div class="span10"><a data-toggle="collapse" data-parent="#project-tasks-list" href="#task-no-'+taskID+'">'+tasktitle+'</a></div><div class="span2"><button type="button" class="btn btn-success pull-right">Done</button><div class="span12"><div class="pull-right"><a data-id="'+taskID+'" href="#" class="edit-task-details">Edit </a><a data-id="'+taskID+'" href="#" class="delete-task-details">Delete</a></div></div></div></div></div></div><div id="task-no-'+taskID+'" class="accordion-body collapse"><div class="accordion-inner">'+taskDesc+'<div class="span12"><div class="pull-right"><a href="#">Comment</a></div></div></div></div></div>');
				$('#task-edit-area-'+taskID).html('<div class="control-group"><input type="text" placeholder="Task Name" class="input-xxlarge" id="edit-taskname-'+taskID+'" value="'+tasktitle+'"></div><div class="control-group"><textarea rows="5" class="input-xxlarge" placeholder="Task Description" id="edit-taskdesc-'+taskID+'">'+taskDesc+'</textarea></div><div class="control-group"><a href="#" class="btn btn-primary save-edited-task" data-id="'+taskID+'">Save</a><a href="#" class="btn cancel-edited-task" data-id="'+taskID+'">Cancel</a></div>');		
				$('#task-edit-area-'+taskID).hide();
				$('#task-display-area-'+taskID).show();
			}
		});
	});

	$('body').on('click','.delete-task-details',function(e){
		e.preventDefault();
		taskID = $(this).data('id');
		$.ajax({
			type:"DELETE",
			url:"../api/tasks/"+taskID,
			success: function(){
				$('#task-display-area-'+taskID).remove();				
				$('#task-edit-area-'+taskID).remove();				
			}
		});
	});

	loadProjectInfo();
	loadTasks();
});
