Stargazer**z** - export repository stargazer**s** profile as JSON
=========================================

<!-- [![Build Status](https://img.shields.io/circleci/project/FGRibreau/stargazerz.svg)](https://circleci.com/gh/FGRibreau/stargazerz/) [![Coverage Status](https://img.shields.io/coveralls/FGRibreau/stargazerz/master.svg)](https://coveralls.io/github/FGRibreau/stargazerz?branch=master)  -->

[![Deps](	https://img.shields.io/david/FGRibreau/stargazerz.svg)](https://david-dm.org/FGRibreau/stargazerz) [![NPM version](https://img.shields.io/npm/v/stargazerz.svg)](http://badge.fury.io/js/stargazerz) [![available-for-advisory](https://img.shields.io/badge/available%20for%20consulting%20advisory-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)

<!-- [![Downloads](http://img.shields.io/npm/dm/stargazerz.svg)](https://www.npmjs.com/package/stargazerz)-->



Command line to know more about your GitHub repository stargazers. List every github profiles (name, emails, ...) of users who starred your project.

Please **don't use it for evil**, this project **bypass Github rate limiting** through scraping.

![a](http://i.imgur.com/M21OUU7.gif)


## Shameless plug

- [**Charts, simple as a URL**. No more server-side rendering pain, 1 url = 1 chart](http://bit.ly/2e1wzfG)
- [Looking for a free **Redis GUI**?](http://bit.ly/2e1xug6) [Or for **real-time alerting** & monitoring for Redis?](http://bit.ly/2e1y65v)

## Usage


```shell
stargazerz --slug fgribreau/common-env
{"fullname":"Anand Sharma","username":"indrayam","bio":"IT Architect @ Cisco. I love Software and I relish Ops. DevOps was made for guys like me.","worksFor":"Cisco Systems","homeLocation":"Cary, NC","url":"http://linkedin.com/in/indrayam"}
{"fullname":"Alexandre Vilain","username":"alexandrevilain","bio":"Développeur Web (PHP, Symfony2, Django, Node.js, Angular.js [ 1 & 2]) & Mobile, étudiant à Supinfo.","homeLocation":"Nantes - France","url":"http://www.alexandrevilain.me"}
{"fullname":"Romain Baumier","username":"rbaumier","worksFor":"Redsmin","homeLocation":"Nantes/Angers","email":"truncated-email"}
{"fullname":"David Sferruzza","username":"dsferruzza","worksFor":"Escale / Université de Nantes","homeLocation":"Nantes","email":"truncated-email@gmail.com","url":"https://david.sferruzza.fr/"}
{"fullname":"Baptiste JAMIN","username":"mywaystar","bio":"@crisp-im co-founder","worksFor":"Crisp IM","homeLocation":"Paris (France)","url":"http://baptiste.ninja"}
...
```

Only extract emails (using [jq](https://github.com/stedolan/jq/)):

```shell
stargazerz --slug fgribreau/common-env | jq -r '.email'
email1@gmail.com
null
email2@gmail.com
null
null
email3@gmail.com
null
email4@waxzce.org
...
```

Export in CSV format:

```shell
stargazerz --slug fgribreau/common-env | jq -r '[.fullname,.username,.worksFor,.homeLocation,.email,.url] | @csv'
"Eduardo Gutierrez","ecbypi",,"Cambridge, MA","email1@mit.edu",
"","ibmsoft",,,,
"Christine van Wyk","Chris10e",,,,
"Mahesh","maheshsaini89",,"Mumbai","email2@gmail.com",
"Sudheera Njs","sudheera-goibibo","goibibo.com","Bangalore",,"http://sudhi.in/"
"Julian Rademacher","moortaube",,"Berlin, Germany",,"https://Blog.moortaube.de"
"Moe","moesphemie",,"Düsseldorf, Germany",,"http://moe.fut1.com"
"ADoyle","adoyle-h",,"Hángzhōu, China","email3@gmail.com","http://adoyle.me/blog"
```

## Installation

Install with [npm](https://npmjs.org/package/stargazerz).

    npm install -g stargazerz

## [Changelog](CHANGELOG.md)

## You want to support my work?

I maintain this project in my free time, if it helped you, well, I would be grateful to buy a beer thanks to your [paypal](https://paypal.me/fgribreau) or [Bitcoins](https://www.coinbase.com/fgribreau), donation!

[Francois-Guillaume Ribreau](http://fgribreau.com) (npm@fgribreau.com)
