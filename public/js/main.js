var app = angular.module('surveyApp', []);

app.controller('surveyCntrl', ['$scope', '$http', function($scope, $http) {

    $scope.survey = {};
    $scope.survey.timeStamp = new Date();

    $scope.submitSurvey = function() {

        console.log($scope.survey);

        $http.post('/api/submitSurvey', $scope.survey).then(function(res) {
            if (res.data.error) {
                //handle error
                console.log(res.data);
            }
            else {
                // redirect
            }
        });
    };

}]);
