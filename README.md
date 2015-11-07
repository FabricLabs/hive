Hive
====
[![Build Status](https://img.shields.io/travis/martindale/hive.svg?branch=master&style=flat-square)](https://travis-ci.org/martindale/hive)
[![Coverage Status](https://img.shields.io/coveralls/martindale/hive.svg?style=flat-square)](https://coveralls.io/r/martindale/hive)
[![Community](https://community.ericmartindale.com/badge.svg)](https://community.ericmartindale.com/)

Swarm-hosted streaming.

## Quick Start

~~~sh
# getting the code
git clone git@github.com:nko5/srs.git && cd ./srs/

# developing
npm install
npm start

# setup your modulus account
npm install -g modulus
modulus login

# deploying to Modulus (to http://srs.2015.nodeknockout.com/)
modulus deploy

# view the most recent logs from modulus
modulus project logs
~~~

Read more about this setup [on our blog][deploying-nko].

[deploying-nko]: http://www.nodeknockout.com/deploying

### Vote KO Widget

![Vote KO widget](http://f.cl.ly/items/1n3g0W0F0G3V0i0d0321/Screen%20Shot%202012-11-04%20at%2010.01.36%20AM.png)

Use our "Vote KO" widget to let from your app directly. Here's the code for
including it in your site:

~~~html
<iframe src="http://nodeknockout.com/iframe/srs" frameborder=0 scrolling=no allowtransparency=true width=115 height=25>
</iframe>
~~~

## Have fun!

If you have any issues, we're on IRC in #nodeknockout on freenode, email us at
<help@nodeknockout.com>, or tweet [@nodeknockout](https://twitter.com/nodeknockout).
