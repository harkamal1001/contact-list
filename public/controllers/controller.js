/*function AppCtrl(){
	console.log("Hello world from controller")
}*/

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function(){ //----------------to refresh control

//-------------to recieve data from server.js----------------
    
    $http.get('/contactlist').success(function(response){ 
    	console.log("I got the data I requested");
    	$interval(function(){$scope.contactlist = response  //put file to browser

    	$scope.contact="";},100);
    });
   //-----------------------------------------------

};

refresh();

//-------------------to insert data through server.js--------------------
    
    $scope.addContact = function(){
    	console.log($scope.contact);
    	$http.post('/contactlist', $scope.contact).success(function(response){
    		console.log(response);
    		refresh(); //to refresh control
    	});
    };

//-------------------------------------------------------------------------

//---------to delete-----------------------
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		})
	};
//-----------------------------------------
$scope.edit = function(id){
	console.log(id);
	$http.get('/contactlist/' +id ).success(function(response){
			$scope.contact = response;
	});
};

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
		refresh();
	});

$scope.deselect = function(){
	$scope.contact = "";
}

};

   /* person1 = {
    	name: 'Tim',
    	email: 'tim@email.com',
    	number: '(111) 111 1111'
    };

    person2 ={
    	name: 'Emily',
    	email: 'emily@email.com',
    	number: '(222) 222 2222'
    };

    person3 = {
    	name: 'John',
    	email: 'john@email.com',
    	number: '(333) 333 3333'
    };

    var contactlist = [person1,person2,person3];
    $scope.contactlist= contactlist;*/
}]);

