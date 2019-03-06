var app = angular.module('app', ["xeditable"]);

angular.module('app').controller("editRowController", function ($scope) {
    $scope.testClick = function () {
        alert('button clicked');
    };

    $scope.$watch('rowform.$data.make', function (value) {
        console.log('equip.make value: ' + value);
        $scope.models = _.filter($scope.allModels, function(item){
            return item.make == value;
        });
    });
  
    // detect if row is editable by using onshow / onhide on form element
    $scope.setEditable = function(value) {
      console.log('is equip id ' + $scope.equip.id + ' editable? [using onshow / onhide] ' + value);
    };
  
    // detect if row is editable by using a watcher on the form property $visible
    $scope.$watch('rowform.$visible', function(value) {
      console.log('is equip id ' + $scope.equip.id + ' editable [by watching form property]? ' + value);
    });
});


angular.module('app').controller("quoteBuckingRaterController", function ($scope, $filter) {
    $scope.equipment = []; 
    $scope.makes = [{value: 1, name: 'Horst'}, {value: 2, name: 'Fritz'}]; 
    $scope.allModels = [{id: 1, name: 'PC5300', make: 1}, {id: 1, name: 'PC7400', make: 1}, {id: 1, name: 'NX2000', make: 2}, {id: 2, name: 'XZ5400', make: 2}];
    $scope.models = [];

    $scope.showModel = function(equip) {
        if(equip.model) {
            var selected = $filter('filter')($scope.models, {id: equip.model});
            return selected.length ? selected[0].name : 'Not set';
        } else {
            return 'Not set';
        }
    };

    $scope.showMake = function(equip) {
        if (equip.model) {
            var selected = $filter('filter')($scope.models, { id: equip.model });
            if (selected.length && selected.length > 0) {
                if (equip.make != selected[0].make)
                    equip.make = selected[0].make;
                return selected[0].make;
            }
            else {
                return 'Not set';
            }
        } else {
            return 'Not set';
        }
    };

    $scope.checkName = function (data, id) {
        if (!data) {
            return "Description is required";
        }
    };

    $scope.checkModel = function (data, id) {
        if (!data) {
            return "Model is required";
        }
    };

    $scope.saveEquipment = function (data, id) {
        $scope.inserted = null;
    };

    $scope.cancelRowEdit = function (data, id) {
        $scope.inserted = null;
    };

    $scope.removeEquipment = function(index) {
        $scope.equipment.splice(index, 1);
    };

    $scope.addEquipment = function() {
        $scope.inserted = {
            id: $scope.equipment.length+1,
            name: '',
            make: null,
            model: null 
        };
        $scope.equipment.push($scope.inserted);
    };
});


