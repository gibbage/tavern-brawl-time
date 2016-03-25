# It's Tavern Brawl Time!

A simple Pebble watchapp written using Pebble.js. When opened the app displays
the details of the current Hearthstone Tavern Brawl. For Pebble watches that
support the Pebble Timeline feature pins will appear in your timeline to let
you know when the current Brawl is ending or when the next one is starting.

The data is being served out of an Amazon S3 bucket with Static Website Hosting
enabled and the publishing of the data is handled by a separate repo
[Tavern Brawl Time Publish](gibbage/tavern-brawl-time-publish). This repo is
also responsible for updating the Pebble Timeline pins.

This is my first Pebble app and its been lots of fun. I started building it
using [Cloud Pebble](https://cloudpebble.net) which is great to get up and
running. I'm finding that I'm getting to the stage where I don't feel
comfortable without some unit tests though. The git integration is also pretty
basic. In future I might try installing the full Pebble SDK so I can fully
develop locally. For now though I'm just running my tests here and then pulling
from within CloudPebble.

## Setup

Install the dependencies:
```
npm install
```

Setup a `vendor` directory and symlink.
```
mkdir -p node_modules/vendor
ln -sr node_modules/moment node_modules/vendor/moment
```

I discovered looking through the [Pebble.js](pebble/pebblejs) repo that it
includes Moment.js at runtime, but expects in the `vendor/moment` directory.
Hence the weird symlink stuff above.

## Running the tests

```
npm test
```
