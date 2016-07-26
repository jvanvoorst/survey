var app = angular.module('surveyApp', ['ngMessages', 'ngRoute']);

app.controller('surveyCntrl', ['$scope', '$http', '$window', '$routeParams', '$location', function($scope, $http, $window, $routeParams, $location) {

    $scope.submitted = false;
    $scope.survey = {};
    $scope.survey.timeStamp = new Date();
    $scope.thanks = false;

    // grab the urlencode and parse out the session id and url
    if (window.location.search) {
        $scope.encode = {
            id: window.location.search.split('&')[0].split('=')[1],
            url: window.location.search.split('&')[1].split('=')[1]
            // url: window.location.search.split('&')[1].split('=')[1].slice(3, (window.location.search.split('&')[1].split('=')[1].length - 3))
        }
        console.log($scope.encode);
    }


    $scope.submitSurvey = function() {

        // set to true when submit button clicked
        $scope.submitted = true;

        if (form.user[0].validity.valid && form.affiliation[0].validity.valid && form.location[0].validity.valid && form.usage[0].validity.valid) {

            console.log('can submit')
            $scope.thanks = true;

            // add the session id and url to the survey object before sending to database
            $scope.survey.sessionID = $scope.encode.id;
            $scope.survey.url = $scope.encode.url;

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