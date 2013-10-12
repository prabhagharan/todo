$(function () {
	var path = window.location.pathname;
	var pathArray = path.split('/');
	function loadProjectInfo(){
		$.getJSON('../api/project/'+pathArray[2],function(data){
			$.each(data, function(index, item){
				var projectName = item.project_name;
				var projectDesc = item.project_description;
				$('#project-details').append('<h3>'+projectName+'</h3><p>'+projectDesc+'</p>');
			});
		});		
	}

	function loadTasks(){
		$.getJSON('../api/tasks/'+pathArray[2],function(data){
			$.each(data, function(index, item){
				var taskID = item.task_id;
				var tasktitle = item.task_title;
				var taskDesc = item.task_description;
				$('#project-tasks-list').append('<div id="task-display-area-'+taskID+'"><div class="accordion-group"><div class="accordion-heading"><div class="accordion-toggle"><div class="row-fluid"><div class="span10"><a data-toggle="collapse" data-parent="#project-tasks-list" href="#task-no-'+taskID+'">'+tasktitle+'</a></div></div></div></div><div id="task-no-'+taskID+'" class="accordion-body collapse"><div class="accordion-inner">'+taskDesc+'</div></div></div></div>');
			});
		});
	}



	loadProjectInfo();
	loadTasks();
});
