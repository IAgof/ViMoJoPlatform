(function() {

	angular.module('app').controller('LoginController', ['login', 'session', '$state', '$stateParams', LoginController]);

	function LoginController(login, session, $state, $stateParams) {
		var self = this;

		// Service binding
		self.service = login;
		
		// Properties
		self.username = '';
		self.password = '';
		self.error = '';
		self.loading = false;

		// Methods
		self.submit = submit;


		// On Run...
		if(session._id > 0) {
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}


		// Internal functions
		function submit() {
			self.loading = true;
			self.error = null;
			console.log('Submiting...');
			self.service.login(self.username, self.password, success);
		}

		function success(result, data) {
			self.loading = false;
			if(result) {
				console.log('Logged in! Redirecting...');
				$state.go($stateParams.redirect || 'home');
			} else {
				console.log('Bad username or password...');
				self.error = 'Wrong login data. Check it out...';
			}
		}
	}

})();
1