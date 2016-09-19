angular.module('ang')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    function getPhoto(Storage, $stateParams) {
        return Storage.getPhoto($stateParams.id);
    }
    function getAllPhotos(Storage) {
        return Storage.getAllPhotos();
    }

	$stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/homeView.html',
            controller: 'HomeCtrl',
            resolve: {
                photos: getAllPhotos
            }
        })
        .state('photo', {
            url: '/photo/:id',
            templateUrl: 'app/photo/photoView.html',
            controller: 'PhotoCtrl',
            resolve: {
                photo: getPhoto
            }
        });
    $urlRouterProvider.otherwise('/');
}]);