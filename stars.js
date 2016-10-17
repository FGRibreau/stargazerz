'use strict';
const osmosis = require('osmosis');
const argv = require('yargs')
  .count('Usage:  $0 <command> [options]')
  .describe('slug', 'Github repository slug, e.g. "fgribreau/common-env"')
  .example('$0 --slug', 'count the lines in the given file')
  .demand('slug')
  .help('h')
  .alias('h', 'help')
  .epilog('@FGRibreau')
  .alias('v', 'verbose')
  .argv;

osmosis
  .get(`https://github.com/${argv.slug}/stargazers`)
  .paginate('.pagination a:last-child')
  .find('.follow-list-item .follow-list-name')
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
  .data(listing => console.log(JSON.stringify(listing)))
