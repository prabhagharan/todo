$(function () {
	var path = window.location.pathname;
	var pathArray = path.split('/');
	function loadProjects(){
		$.getJSON('../api/projects/'+pathArray[2],function(data){
			$('#projects-list').append('<div class="span12"></div>');
			$.each(data, function(index, item){
				$('#projects-list').append('<div class="span12" id=project'+item.project_id+'><div class="pull-left span12"><a href="#" class="edit-project" data-id="'+item.project_id+'" data-name="'+item.project_name+'">Edit</a> <a href="#" class="delete-project" data-id="'+item.project_id+'">Delete</a></div><div class="lead pull-left"><a href="../project/'+item.project_id+'">'+item.project_name+'</a></div></div><div class="span12 project-hr-'+item.project_id+'"><hr/></div>');
			});
		});
	}

	$('body').on('click','.edit-project',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		projectName = $(this).data('name');
		$('#project'+projectID).html('<div class="form-inline span12"><input type="text" id=edited-project-'+projectID+' value="'+projectName+'"> <button class="btn btn-primary btn-small save-edit-projectname" type="button" data-id="'+projectID+'">Save</button> <button class="btn btn-small cancel-edit-projectname" type="button" data-id="'+projectID+'" data-name="'+projectName+'">Cancel</button></div>');
	});

	$('body').on('click','.cancel-edit-projectname',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		projectName = $(this).data('name');		
		$('#project'+projectID).html('<div class="pull-left span12"><a href="#" class="edit-project" data-id="'+projectID+'" data-name="'+projectName+'">Edit</a> <a href="#" class="delete-project" data-id="'+projectID+'">Delete</a></div><div class="lead pull-left"><a href="../project/'+projectID+'">'+projectName+'</a></div>');
	});

	$('body').on('click','.save-edit-projectname',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		projectName = $('#edited-project-'+projectID).val();
		$.ajax({
			type:"PUT",
			url:"../api/project/"+projectID,
			data:{id: projectID,ProjectName: projectName},
			success: function(){
				$('#project'+projectID).html('<div class="pull-left span12"><a href="#" class="edit-project" data-id="'+projectID+'" data-name="'+projectName+'">Edit</a> <a href="#" class="delete-project" data-id="'+projectID+'">Delete</a></div><div class="lead pull-left"><a href="../project/'+projectID+'">'+projectName+'</a></div>');				
			}
		});
	});

	$('body').on('click','.delete-project',function(e){
		e.preventDefault();
		projectID = $(this).data('id');
		$.ajax({
			type:"DELETE",
			url:"../api/project/"+projectID,
			success: function(){
				$('#project'+projectID).remove();				
				$('.project-hr-'+projectID).remove();				
			}
		});
	});

	$('body').on('click','#add-project-button',function(e){
		$('#add-project-button').hide();		
		$('#add-project-form').show();
		$('#new-projectname').val('');
		console.log("addd");
	});

	$('body').on('click','.cancel-new-projectname',function(e){
		$('#add-project-button').show();		
		$('#add-project-form').hide();
	});

	$('body').on('click','.save-new-projectname',function(e){
		e.preventDefault();
		projectName = $('#new-projectname').val();
		$.ajax({
			type:"POST",
			url:"../api/project",
			data:{Projectname: projectName, UserID: pathArray[2]},
			success: function(responseText){
				project_id=responseText.insertId;
				$('#projects-list').append('<div class="span12" id=project'+project_id+'><div class="pull-left span12"><a href="#" class="edit-project" data-id="'+project_id+'" data-name="'+projectName+'">Edit</a> <a href="#" class="delete-project" data-id="'+project_id+'">Delete</a></div><div class="lead pull-left"><a href="../project/'+project_id+'">'+projectName+'</a></div></div><div class="span12 project-hr-'+project_id+'"><hr/></div>');	
			
				$('#add-project-button').show();		
				$('#add-project-form').hide();
			}
		});
	});

	loadProjects();
});
