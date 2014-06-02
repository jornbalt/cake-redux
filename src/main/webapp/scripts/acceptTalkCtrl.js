angular.module('cakeReduxModule')
    .controller('AcceptTalkCtrl', ['$scope', '$http', 'talkList','$location',
        function($scope, $http, talkList,$location) {

            $scope.accept = ($location.path() === "/accept");
            $scope.title = ($scope.accept) ? "Accept talks" : "Mass update";
            $scope.doSendMail = false;
            $scope.doTag = false;


            $scope.talks = talkList.talks;
            $scope.numTalks = $scope.talks.length;
            $scope.statusLines = [];

            $scope.acceptTalks = function() {
                var talkList = [];
                _.each($scope.talks,function(talk) {
                    talkList.push({ref: talk.ref});
                });
                var inputData;
                var inputUrl;
                if ($scope.accept) {
                    inputData = {talks: talkList};
                    inputUrl = "data/acceptTalks";
                } else {
                    inputData = {
                      talks: talkList,
                      doSendMail: $scope.doSendMail,
                      subject: $scope.subject,
                      message: $scope.message,
                      doTag: $scope.doTag,
                      newtag: $scope.newtag
                    };
                    inputUrl = "data/massUpdate";
                }

                $http({
                    method: "POST",
                    url: inputUrl,
                    data: inputData
                }).success(function(data) {
                    $scope.statusLines = data;
                }).error(function(data, status, headers, config) {
                    console.log("ERROR");
                });
            };

            $scope.lineClass = function(status) {
                if (status === "error") {
                    return "danger";
                }
                return "";
            }
        }]);


