var app = angular.module('surveyApp', ['ngMessages']);

app.controller('surveyCntrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.submitted = false;
    $scope.survey = {};
    $scope.survey.timeStamp = new Date();
    $scope.thanks = false;
    $scope.urlObj = {};

    // function to create object from url and it's parameters
    function urlObject(options) {
        "use strict";
        /*global window, document*/

        var url_search_arr,
            option_key,
            i,
            urlObj,
            get_param,
            key,
            val,
            url_query,
            url_get_params = {},
            a = document.createElement('a'),
            default_options = {
                'url': window.location.href,
                'unescape': true,
                'convert_num': true
            };

        if (typeof options !== "object") {
            options = default_options;
        } else {
            for (option_key in default_options) {
                if (default_options.hasOwnProperty(option_key)) {
                    if (options[option_key] === undefined) {
                        options[option_key] = default_options[option_key];
                    }
                }
            }
        }

        a.href = options.url;
        url_query = a.search.substring(1);
        url_search_arr = url_query.split('&');

        if (url_search_arr[0].length > 1) {
            for (i = 0; i < url_search_arr.length; i += 1) {
                get_param = url_search_arr[i].split("=");

                if (options.unescape) {
                    key = decodeURI(get_param[0]);
                    val = decodeURI(get_param[1]);
                } else {
                    key = get_param[0];
                    val = get_param[1];
                }

                if (options.convert_num) {
                    if (val.match(/^\d+$/)) {
                        val = parseInt(val, 10);
                    } else if (val.match(/^\d+\.\d+$/)) {
                        val = parseFloat(val);
                    }
                }

                if (url_get_params[key] === undefined) {
                    url_get_params[key] = val;
                } else if (typeof url_get_params[key] === "string") {
                    url_get_params[key] = [url_get_params[key], val];
                } else {
                    url_get_params[key].push(val);
                }

                get_param = [];
            }
        }

        urlObj = {
            protocol: a.protocol,
            hostname: a.hostname,
            host: a.host,
            port: a.port,
            hash: a.hash.substr(1),
            pathname: a.pathname,
            search: a.search,
            parameters: url_get_params
        };

        return urlObj;
    }

    // grab the url and parse out the parameters
    if (window.location) {
        $scope.urlObj= urlObject({'url':window.location.href});
    }


    $scope.submitSurvey = function() {

        // set to true when submit button clicked
        $scope.submitted = true;

        if (form.user[0].validity.valid && form.affiliation[0].validity.valid && form.location[0].validity.valid && form.usage[0].validity.valid) {

            console.log('can submit');
            $scope.thanks = true;

            // add the session id and url to the survey object before sending to database
            if ($scope.urlObj.parameters.id) { $scope.survey.sessionID = $scope.urlObj.parameters.id; }
            if ($scope.urlObj.parameters.url) { $scope.survey.url = $scope.urlObj.parameters.url; }

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