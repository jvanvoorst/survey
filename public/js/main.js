var app = angular.module('surveyApp', ['ngMessages', 'ngRoute']);

app.controller('surveyCntrl', ['$scope', '$http', '$window', '$routeParams', '$location', function($scope, $http, $window, $routeParams, $location) {

    $scope.submitted = false;
    $scope.survey = {};
    $scope.survey.timeStamp = new Date();
    $scope.thanks = false;

    console.log(window.location.search);

    // var id = $location.search().id;
    // var url = $location.search().url;
    // console.log(id);
    // console.log(url);

    $scope.submitSurvey = function() {

        // set to true when submit button clicked
        $scope.submitted = true;

        if (form.location[0].validity.valid) {

            console.log('can submit')
            $scope.thanks = true;

            $scope.survey.sessionID = id;
            $scope.survey.url = url;

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

var urlEncode = '?id=212&url=http://yahoo.com';

var woquestion = urlEncode.slice(1);

var urlEncodeArray = woquestion.split('&')

var idString = urlEncodeArray[0].split('=');

var urlString = urlEncodeArray[1].split('=');

console.log(idString);
console.log(urlString);