angular.module('ang').controller("HomeCtrl", ['$scope', 'Storage', '$state', 'photos',
	function($scope, Storage, $state, photos) {
		$scope.filterValue = "";
		$scope.photos = photos;
		$scope.images = [];
		$scope.updateList = function() {
			$scope.images = $scope.photos.filter(function(item) {
				if($scope.filterValue && item.name.indexOf($scope.filterValue) != 0) {
					return false;
				}
				return true;
			});
		}
		$scope.openPhoto = function(id) {
			$state.go('photo', {id: id});
		};

		$scope.updateList();
	}
]);