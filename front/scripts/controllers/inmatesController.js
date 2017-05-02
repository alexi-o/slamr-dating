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
	
	getInmates();
  
  	function getInmates(){
  	$http
	    .get("http://localhost:3000/inmates/")
	    .then(function(response){
	      console.log(response.data);
	      self.all = response.data;
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

//  	function getInmates(){
//  	$http
//  		.get("http://localhost:3000/inmates")
//  		.then(function(res){
// 	     console.log(res.data);
// 	     self.all = res.data;
//     	});
// }
//     function deleteInmate(inmate){
//     	$http
//     		.get("http://localhost:3000/inmates/" + inmate._id)
//     		.then(function(res){
//     			var index = self.all.indexOf(card);
//         		self.all.splice(index, 1);
//     	});
// }  		
//     function updateInmate(inmate) {
// 	    console.log(inmate._id);
// 	    $http
// 	      .put('http://localhost:3000/inmates/' + inmate._id)
// 	      .then(function(res){
// 	        console.log(res.data);
//      	 });
    	
 	// }
 }