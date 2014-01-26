/**
 * Created with JetBrains WebStorm.
 * User: Yogesh Joshi
 * Date: 31/10/13
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */
// Main Controller
RealTimeEdit.controller('MainCtrl', function ($scope, socket, $http, $window) {
    $scope.title = 'Collaborative text editor';

    $scope.file = 'test.txt';
    $scope.getFileContent = function () {
        console.log('inside getFileContent');
        var file = {file: $scope.file};
        $http.post('/file',file)
            .success(function(data){
                $window.alert(data);
            })
    }
    $scope.$watch('file', function(){
        console.log('file changed');
    });
});
