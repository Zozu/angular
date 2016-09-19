angular.module('ang').controller("PhotoCtrl", ['$scope', '$state', 'Storage', 'photo',
		function($scope, $state, Storage, photo) {
			$scope.photo = photo;
			$scope.cancel = function() {
				$state.go('home');
			}
			$scope.save = function() {
				Storage.update($scope.photo)
					.then(function() {
						$state.go('home');
					});
			}
		}
]);