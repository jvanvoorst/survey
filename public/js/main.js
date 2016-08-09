var app = angular.module('surveyApp', ['ngMessages']);

app.controller('surveyCntrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

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
        };
        console.log($scope.encode);
    }


    $scope.submitSurvey = function() {

        // set to true when submit button clicked
        $scope.submitted = true;

        if (form.user[0].validity.valid && form.affiliation[0].validity.valid && form.location[0].validity.valid && form.usage[0].validity.valid) {

            console.log('can submit');
            $scope.thanks = true;

            // add the session id and url to the survey object before sending to database
            $scope.survey.sessionID = $scope.encode.id;
            $scope.survey.url = $scope.encode.url;

            $http.post('/api/submitSurvey', $scope.survey).then(function(res) {

                if (res.data.error) {
                    //handle error
                    console.log(res.data.error);
                }
                else {
                    $scope.url = res.data;
                }
            });
        }
        else {
            console.log('cannot submit');
        }

    };

}]);