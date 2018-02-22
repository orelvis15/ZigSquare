angular.module('index', ["ngRoute"])
.controller('main', function ($scope,$http) {
    //window.location.href="http://localhost:3000";
    $scope.title = "ZigSquare";
    
    $scope.loadscores = function(){        
		$http({
            method:'get',
            url:'/all'
        }).success(function(data){
            if(typeof data=='object'){
            	$scope.scores = data;
            }else{
                alert('Error al cargar los clientes');
            }
        })
	};
});