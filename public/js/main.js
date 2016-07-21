var app = angular.module('surveyApp', ['ngMessages']);

app.controller('surveyCntrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.submitted = false;
    $scope.survey = {};
    $scope.survey.timeStamp = new Date();
    $scope.thanks = false;

    $scope.submitSurvey = function() {

        // set to true when submit button clicked
        $scope.submitted = true;

        if (form.location[0].validity.valid) {

            console.log('can submit')
            $scope.thanks = true;

            $http.post('/api/submitSurvey', $scope.survey).then(function(res) {

                if (res.data.error) {
                    //handle error
                    console.log(res.data);
                }
                else {
                    $scope.url = res.data
                }
            });
        }
        else {
            console.log('cannot submit')
        }

    };

}]);

