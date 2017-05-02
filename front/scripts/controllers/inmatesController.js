var app = angular.module('SlammerDating', ['ngRoute'])
  .controller('InmatesController', InmatesController)
  .controller('InmatesShowController', InmatesShowController);

////////////
///ROUTES///
////////////

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/inmatesIndex.html',
			controller: 'InmatesController'
		})
		.when('/inmates/:id', {
			templateUrl: '/templates/inmatesShow.html',
			controller: 'InmatesShowController'
		 });
		  	$locationProvider.html5Mode({
		      enabled: true,
		      requireBase: false
    });	
});

///////////////
//CONTROLLERS//
///////////////

InmatesController.$inject = ['$scope', '$http'];
function InmatesController($scope, $http){
	var self = this;
	self.all = [];
	self.getInmates = getInmates;
	self.deleteInmate = deleteInmate;
	
	getInmates();
  
  	function getInmates(){
  	$http
	    .get("http://localhost:3000/inmates/")
	    .then(function(response){
	      console.log(response.data);
	      self.all = response.data;
	    });
	}
	function deleteInmate(inmate){
		console.log("Deleting");
		$http
		.delete('http://localhost:3000/inmates/' + inmate._id)
		.then(function(response){
			console.log(response);
			var index = self.all.indexOf(inmate);
			self.all.splice(index, 1);
		});
	}
}

InmatesShowController.$inject = ['$http','$scope', '$routeParams'];
function InmatesShowController($http, $scope, $routeParams){
		$http
		.get("http://localhost:3000/inmates/" + $routeParams.id)
		.then(function(response){
			console.log($routeParams.id + "ROUTE PARAMS ID");
			console.log(response.data + "This is the data");
			$scope.inmate = response.data;
		});
 }