angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', '$translate', 'session', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload, $translate, session) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.error = null;
	self.session = session;
	self.amIOwner = amIOwner;

	self.video = video;

	self.download = download;

	if (self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}

	// ToDo: Check invalid video :S
	self.video.get(self.id, function () {
		self.loading = false;
	});


	function download() {
		self.error = null;
		self.loading = true;
		videoDownload.get(self.id, self.code, function (status) {
			self.loading = false;
			console.log(status);
			if (status !== 200) {
				self.error = $translate.instant('ERROR_WRONG_DOWNLOAD_CODE');
			}
		});
	}

	function amIOwner() {
		return (self.session.id === self.video.data.owner);
	}
}
