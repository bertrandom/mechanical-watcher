var config = require('config');
var request = require('request');
var cheerio = require('cheerio');
var snoowrap = require('snoowrap');
var moment = require('moment');
var levelup = require('levelup');
var db = levelup('./history');

var checkIf1976IsInStock = function() {
	return new Promise(function (resolve, reject) {

		request('http://pimpmykeyboard.com/sa-1976-keycap-set/', function(error, response, body) {
			if (!error && response.statusCode == 200) {

				$ = cheerio.load(body);

				var changed = false;

				$('div.productAttributeValue select').find('option').each(function(i, el) {
					var value = $(el).attr('value');
					if (value != '' && value != 2005) {
						changed = true;
					}
				});


				var description = $('div.ProductDescriptionContainer p').first().text();

				if (description.indexOf('There are no complete "1976" keysets in stock.') === -1) {
					changed = true;
				}

				resolve(changed);

		  	} else {

		  		resolve(false);

		  	}
		})

	});
}

var checkMechMarket = function() {
	return new Promise(function (resolve, reject) {

		const r = new snoowrap({
		  user_agent: 'mechanical-watcher v1.0',
		  client_id: config.reddit.client_id,
		  client_secret: config.reddit.client_secret,
		  refresh_token: config.reddit.refresh_token
		});

		r.get_subreddit('mechmarket').get_new().then(function(results) {

			var posts = [];

			results.forEach(function(result){
				if (result.title.match('\[H\](.*)[D]?SA(.*)\[W\]') && !result.title.match('\[IC\]')) {

					posts.push({
						how_long_ago: moment(result.created_utc, 'X').fromNow(),
						title: result.title,
						url: result.url
					});

				}
			});

			if (posts.length > 0) {
				resolve(posts);
			} else {
				resolve(null);
			}

		});

	});
}

checkMechMarket().then(function(posts) {

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

checkIf1976IsInStock().then(function(changed) {
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