$(function () {
	var path = window.location.pathname;
	var pathArray = path.split('/');
	function loadProjects(){
		$.getJSON('../api/projects/'+pathArray[2],function(data){
			$('#projects-list').append('<div class="span12"></div>');
			$.each(data, function(index, item){
				$('#projects-list').append('<div class="span12" id=project'+item.project_id+'><div class="lead pull-left"><a href="../project/'+item.project_id+'">'+item.project_name+'</a></div></div><div class="span12 project-hr-'+item.project_id+'"><hr/></div>');
			});
		});
	}


	loadProjects();
});
