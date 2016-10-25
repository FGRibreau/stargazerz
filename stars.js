'use strict';
const osmosis = require('osmosis');
const argv = require('yargs')
  .count('Usage:  $0 <command> [options]')

.describe('slug', 'Github repository slug, e.g. "fgribreau/common-env"')
  .example('$0 --slug', 'count the lines in the given file')
  .demand('slug')

.describe('paginate', 'should stargazers paginate')
  .example('$0 --paginate=false', 'deactivate pagination')
  .boolean('paginate')
  .default('paginate', true)

.describe('paginate-count', 'how many many page to paginate')
  .example('$0 --paginate-count=10', 'paginate through 10 pages')
  .number('paginate-count')
  .default('paginate-count', 5)

.help('h')
  .alias('h', 'help')

.epilog('@FGRibreau')
  .alias('v', 'verbose')
  .argv;

// handle rate-limiting our way (quick & dirty)
const EventEmitter = require('events').EventEmitter;
const request = require('requestretry'); // <3
const randomUseragent = require('random-useragent');

function requestDelayStrategy(err, response, body) {

  if(response && response.statusCode === 429 && response.headers['retry-after']){
    return parseFloat(response.headers['retry-after']) * 1000;
  }

  console.error('(unsupported) requestDelayStrategy', response);
  return Math.floor(Math.random() * (3500 - 500 + 1) + 500);
}

function HTTPOrNetworkErrorOrRateLimit(err, response, body){
  return request.RetryStrategies.HTTPOrNetworkError(err, response, body) || !err && response.statusCode === 429;
}

require('needle').request = function(method, href, params, opts, f) {
  request({
    method: method,
    url: href,
    headers: {
      'User-Agent': randomUseragent.getRandom()
    },

    maxAttempts: 2,
    delayStrategy: requestDelayStrategy,
    retryStrategy: HTTPOrNetworkErrorOrRateLimit,
  }, function(err, res, data) {
    if (err) {
      console.log(err, res);
      process.exit(1);
    }
    f(err, res, data);
  });

  return new EventEmitter(); // fake needle function return
};

let instance = osmosis.get(`https://github.com/${argv.slug}/stargazers`)

if(argv.paginate){
  instance = instance.paginate('.pagination a:last-child', argv.paginateCount);
}

instance.find('.follow-list-name a')
  .follow('@href')
  .set({
    'fullname': '.vcard-fullname',
    'username': '.vcard-username',
    'bio': '.user-profile-bio',
    'worksFor': '.vcard-detail[itemprop="worksFor"]',
    'homeLocation': '.vcard-detail[itemprop="homeLocation"]',
    'email': '.vcard-detail[itemprop="email"]',
    'url': '.vcard-detail[itemprop="url"]'
  })
  .data(listing => {
    console.log(JSON.stringify(listing))
  })
  .error(function(err) {
    console.error(err);
    process.exit(1);
  })
  // .log(console.log.bind(console, 'log'))
  // .debug(console.log.bind(console, 'debug'));
