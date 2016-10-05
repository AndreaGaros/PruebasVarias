//var ip = "http://localhost:8080"
var ip = "http://10.192.137.219:8080"


angular.module('starter.controllers', [])
  

.controller('listaCtrl', function($scope, $http){

  $scope.newPersona = {};
  $scope.personas = {};
  $scope.selected = false;

  $http.get(ip + '/api/persona').success(function(data) {
    $scope.personas = data;
    console.log('datos: ' + JSON.stringify(data));
  })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  // Función que borra un objeto persona conocido su id
  $scope.borrarPersona = function(newPersona) {
    $http.delete(ip + '/api/persona/' + $scope.newPersona._id)
      .success(function(data) {
        $scope.newPersona = {};
        $scope.personas = data;
        $scope.selected = false;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Función para coger el objeto seleccionado en la tabla
  $scope.selectPerson = function(persona) {
    $scope.newPersona = persona;
    $scope.selected = true;
    console.log($scope.newPersona, $scope.selected);
    sessionStorage['persona']= JSON.stringify(persona)
    console.log('person seleccionada ' + JSON.stringify(persona));
  };


})

.controller('RegCtrl', function($scope, $http){

  $scope.newPersona = {};
  $scope.personas = {};
  $scope.selected = false;

  $http.get(ip + '/api/persona').success(function(data) {
    $scope.personas = data;
  })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para registrar a una persona
  $scope.registrarPersona = function() {
    $http.post(ip + '/api/persona', $scope.newPersona)
      .success(function(data) {
        $scope.newPersona = {}; // Borramos los datos del formulario
        $scope.personas = data;
        console.log('dta: ' + JSON.stringify(data));
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

})

.controller('editarCtrl', function($scope, $http){
  console.log('kggkkgkg')
  $scope.edited={};
  console.log('persona en el nuevo tag ' + JSON.parse(JSON.stringify(sessionStorage['persona']))),
  $scope.edited = JSON.parse(sessionStorage['persona']);
  console.log('persona para editar '+ $scope.edited);
  // Función para editar los datos de una persona
  $scope.modificarPersona = function(edited) {
    $http.put(ip + '/api/persona/' + $scope.edited._id, $scope.edited)
      .success(function(data) {
        $scope.edited = {}; // Borramos los datos del formulario
        $scope.personas = data;
        $scope.selected = false;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

});


