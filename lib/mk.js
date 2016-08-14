var config = require('config');
var request = require('request');
var cheerio = require('cheerio');
var snoowrap = require('snoowrap');
var moment = require('moment');

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

var isInteresting = function(title) {
	return !!(title.match(/\[H\](.*)(SA|DSA)(.*)\[W\]/) && !title.match(/\[IC\]/));
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

				if (isInteresting(result.title)) {

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

module.exports = {
	checkIf1976IsInStock: checkIf1976IsInStock,
	checkMechMarket: checkMechMarket,
	isInteresting: isInteresting
};
