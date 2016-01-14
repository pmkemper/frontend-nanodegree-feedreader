# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

## Note

The google API didn't work, so I moved the Google API code down in the app.js file, so that the rest of the code would at least work.

## Steps required to run the application

1. Download the files in this repo
2. Open the index.html file in your browser
3. You will now see the application and the Jasmine test results in your browser

## Future features

A future feature of this application is the ability to add your own RSS feeds, besides the feeds that are added by default.

The user can provide the name and url of the RSS feed. The name and URL will be validated first, after which the feed will be added to the list of all feeds.

A number of the tests have been written already:

1. Tests to check whether validateName will return true for accepted RSS feed names
2. Tests to check whether validateName will return false for invalid or existing RSS feed names
3. Tests to check whether validateUrl will return true for valid URLs
4. Tests to check whether validateUrl will return false for invalid URLs
5. A test to check whether addFeed successfully adds a feed to allFeeds