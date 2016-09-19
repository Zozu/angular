angular.module('ang').run(['$rootScope', 
	function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.route = toState.name.charAt(0).toUpperCase() + toState.name.slice(1);
		});
	} 
]);