var config = require('config');
var request = require('request');
var levelup = require('levelup');
var db = levelup('./history');
var mk = require('./lib/mk');

mk.checkMechMarket().then(function(posts) {

	if (posts) {

		posts.forEach(function(post) {

			db.get(post.url, function (err, value) {
				if (err && err.notFound) {

					request.post({
						url: config.slack.webhook_url, 
						body: {
							"text": "SA or DSA keycaps found on /r/mechmarket",
							"attachments": [{
								"text": post.title + ' - ' + post.how_long_ago,
								"fallback": post.title,
								"fields": [{
									"value": post.url,
									"short": false
								}]
							}],
							"unfurl_links": true
						},
						json: true
					});


					db.put(post.url, true);
				}
			});

		});

	}

});

mk.checkIf1976IsInStock().then(function(changed) {
	if (changed) {
		request.post({
			url: config.slack.webhook_url, 
			body: {
				"text": "1976 SA keycaps in stock",
				"attachments": [{
					"text": 'http://pimpmykeyboard.com/sa-1976-keycap-set/'
				}],
				"unfurl_links": true
			},
			json: true
		});		
	}
});