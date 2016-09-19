var __photos = [
	{
		id:0,
		name: "image0.jpg",
		likes: 5,
		author: "Ivan",
		visible: true
	},
	{
		id:1,
		name: "image1.jpg",
		likes: 10,
		author: "Ivan",
		visible: true
	},
	{
		id:2,
		name: "image2.jpg",
		likes: 11,
		author: "Ivan",
		visible: false
	},
	{
		id:3,
		name: "image3.jpg",
		likes: 0,
		author: "Ivan",
		visible: true
	},
	{
		id:4,
		name: "image4.jpg",
		likes: 9,
		author: "Ivan",
		visible: false
	},
	{
		id:5,
		name: "image5.jpg",
		likes: 7,
		author: "Ivan",
		visible: true
	}
];
angular.module('ang').service('Storage', [
	function(){
		return {
			getPhoto: function(id) {
				return Promise.resolve()
					.then(function() {
						return Object.assign({}, __photos.find(function(item) {
							return item.id == id;
						}));
					});
			},
			getAllPhotos: function() {
				return Promise.resolve(__photos);
			},
			update: function(photo) {
				return Promise.resolve()
					.then(function() {
						var indexInArr = 0;
						__photos.forEach(function(item, index) {
							if(item.id == photo.id) {
								indexInArr = index;
							}
						});
						__photos[indexInArr] = photo;
						return photo;
					});  
			}
		}
	}
]);