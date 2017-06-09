(function() {

	var app = angular.module('company' ,[]);

	app.controller('MainController', function($scope, $http) {	
	
		$scope.formData = {};
		$scope.title = 'Horario';

		$http.get('/subjects')
		.then(function(response) {
			$scope.subjects = response.data;
			console.log(response.data);
		}, function(response) {
			console.log('Something went wrong');

		});



	});



})();