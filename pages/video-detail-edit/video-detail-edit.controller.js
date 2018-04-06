angular.module('app')
	.controller('VideoDetailEditController', ['$stateParams', '$mdConstant', 'session', 'video', 'gmapsApiKey',
		'$sce', '$state', '$mdToast', VideoDetailEditController]);

function VideoDetailEditController($stateParams, $mdConstant, session, video, gmapsApiKey, $sce, $state, $mdToast) {
	var self = this;

	self.session = session;
	self.videoService = video;
	// TODO(jliarte): should move to main controller?
	self.gmapsApiKey = $sce.trustAsResourceUrl('https://maps.googleapis.com/maps/api/js?key=' + gmapsApiKey);
	self.id = $stateParams.id;
	self.loading = true;
	self.actionsDisabled = true;
	self.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

	// selfish Methods
	self.resetVideoPoster = function () {
		self.newPoster = undefined;
	};

	self.resetVideoFile = function () {
		self.newFile = undefined;
	};

	self.update = function () {
		self.actionsDisabled = true;
		sanitizeVideoFields();
		console.log("video to update is ", self.video);
		self.videoService.update(self.video).then( result => {
			showMessage('Video updated!');
			resetForm();
			self.videoService.reset();
			getVideo();
		}).catch( error => {
			console.log("error in request ", error);
			showMessage('Error updating video!');
			resetForm();
		});
	};

	self.delete = function () {
		console.log("calling delete video action");
	};

	// init
	initSelectMaps();
	getVideo();

	// Private selfish methods
	function showMessage(message) {
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.hideDelay(3000)
		);
	}

	function sanitizeVideoFields() {
		self.video.tag = self.tags.join(",");
		self.video.productType = self.productType.join(",");
		self.video.files = [];
		if (self.newPoster) {
			self.video.files.push({name: 'newPoster', file: self.newPoster});
		}
		if (self.newFile) {
			self.video.files.push({name: 'newFile', file: self.newFile});
		}
		self.video.categories = self.category.join(",");
		self.video.id = self.id;
	}

	function resetForm() {
		self.actionsDisabled = false;
		self.resetVideoFile();
		self.resetVideoPoster();
	}

	function checkEditAccess(video) {
		if (video !== undefined && video.owner === self.session.id) {
			if (self.session.role === 'editor') {
				self.editorRole = true;
			}
			console.log("User is allowed to edit this video");
		} else {
			// TODO(jliarte): should show an error instead of redirecting?
			$state.go("videoPreview", {id: self.id});
		}
	}

	function initSelectMaps() {
		self.videoService.getVideoLangs().then(langs => self.langs = langs );
		self.videoService.getProductTypes().then(productTypes => self.productTypes = productTypes );
		// TODO(jliarte): get them from backend
		self.categories = ['Economía', 'Nacional', 'Internacional'].map(function (category) {
			return {name: category};
		});
	}

	function initVideoFields() {
		if (self.video.date == {}) {
			delete self.video.date;
		}
		self.video.quality = self.video.quality || 0;
		self.video.credibility = self.video.credibility || 0;
		self.video.priceStd = self.video.priceStd || 0;
		self.video.priceCountry = self.video.priceCountry || 0;
		self.video.priceContinent = self.video.priceContinent || 0;
		self.video.priceWorld = self.video.priceWorld || 0;
		self.tags = [];
		self.productType = [];
		self.category = [];
		if (self.video.tag) {
			self.tags = self.video.tag.trim().split(',').filter(item => item);
		}
		if (self.video.productType) {
			self.productType = self.video.productType.trim().split(',').filter(item => item);
		}
		if (self.video.categories) {
			self.category = self.video.categories.trim().split(',').filter(item => item);
		}
	}

	function getVideo() {
		if (self.videoService && self.videoService.data && self.videoService.data.id !== self.id) {
			self.videoService.reset();
		}

		self.videoService.get(self.id, function () {
			self.video = self.videoService.data;
			console.log("retrieved video is ", self.video);
			checkEditAccess(self.video);
			initVideoFields();
			self.loading = false;
			self.actionsDisabled = false;
		});
	}

}
