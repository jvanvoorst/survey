var app = angular.module('surveyApp', []);

app.controller('surveyCntrl', ['$scope', '$http', function($scope, $http) {

    $scope.surveySubmit = function() {
        $http.post('api/submitSurvey', $scope.survey).then(function(res) {
            if (res.data.error) {
                //handle error
            }
            else {
                // redirect
            }
        })
    }

}]);
