angular.module('app')
	.service('video', ['api', videoService]);

function videoService(api) {
	var video = {
		data: null,
		get: get,
		reset: reset,
		update,
		getVideoLangs,
		getProductTypes,
		getVideoCategories,
	};

	return video;


	function get(videoId, callback) {
		api.get(api.url + '/video/' + videoId, function (data, status) {
			video.data = data;
			if (callback && typeof callback === 'function') {
				callback(data, status);
			}
		});
	}

	function update(video) {
		return new Promise((resolve, reject) => {
			api.put(api.url + '/video/' + video.id + '/', video, function (result, status) {
				if (status < 400) {
					resolve(result);
				} else {
					reject(status);
				}
			})
		});
	}

	function getVideoLangs() {
		return new Promise((resolve, reject) => {
			api.get(api.url + '/video/lang', function (videoLangs, status) {
				if (videoLangs != undefined && status < 400) {
					resolve(videoLangs);
				}
				reject(status);
			});
		});
	}

	function getProductTypes() {
		return new Promise((resolve, reject) => {
			api.get(api.url + '/video/product_type', function (productTypes, status) {
				if (productTypes != undefined && status <= 400) {
					resolve(productTypes);
				}
				reject(status);
			});
		});
	}

	function getVideoCategories() {
		return new Promise((resolve, reject) => {
			api.get(api.url + '/video/category', function (videoCategories, status) {
				if (videoCategories != undefined && status <= 400) {
					resolve(videoCategories);
				}
				reject(status);
			});
		});
	}

	function reset() {
		video.data = null;
	}
}
