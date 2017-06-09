(function() {

	var app = angular.module('company' ,[]);

	app.controller('MainController', function($scope, $http) {	
	
		$scope.formData = {};
		$scope.title = 'Horario';

		$http.get('/subjects')
		.then(function(response) {
			$scope.subjects = response.data;
		}, function(response) {
			console.log('Something went wrong');

		});

		$scope.search = function() {
			if($scope.search_subject) {
				$http.get('/subjects/' + $scope.search_subject)
				.then(function(response) {
					$scope.subjects = response.data;
				}, function(response) {
					$scope.subjects = "Something went wrong";
				});
			}
			else {
				$http.get('/subjects/')
				.then(function(response) {
					$scope.subjects = response.data;
				}, function(response) {
					$scope.subjects = "Something went wrong";
				});
			}
		};


	});



})();