/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed and check for each url whether it 
         * a) is defined, and b) is not empty
         */
        it('has URL', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy(); 
            }
        });

        /* Loop through each feed and check for each name whether it 
         * a) is defined, and b) is not empty
         */
        it('has name', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy(); 
            }
        });
    });


    /* A test suite that will test whether the menu is hidden by default
     * and whether clicking on the menu icon opens and closes the menu
     */
    describe('The menu', function() {

        // define these variables once since we use them multiple times
        var $body = $('body'),
            $menuIconLink = $('.menu-icon-link');

        /* 
         * Ensure the menu element is hidden by default. 
         */
        it('is hidden by default', function() {
            expect($body.hasClass('menu-hidden')).toEqual(true);
        });

         /* The following test ensures the menu changes
          * visibility when the menu icon is clicked. 
          * First a click is 'triggered' and body should not have 'menu-hidden'
          * Next, another click is 'triggered' and body should have 'menu-hidden' again
          */
        it('changes the visibility when the menu icon is clicked', function() {
            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(false);

            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(true);
        });
    });

    /* This test suite checks whether loadFeed loads at least one entry" */
    describe('Initial Entries', function() {

        /* The following is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed is asynchronous, beforeEach and done() are used.
         */

        // loadFeed is executed, and the following test will not execute until
        // loadFeed has returned (which we achieve by passing the done function 
        // as an argument to loadFeed in beforeEach)
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Once loadFeed() has run, we check whether there is at least one .entry
        it('loads at least one entry', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });        
    });

    /* This test suite tests whether content actually changes after loading a new feed */
    describe('New Feed Selection', function() {
  
        // declare variables here so that they can be accessed in the entire test suite
        var feedOneHeader,
            feedTwoHeader;

        // We use beforeEach and done() again, since loadFeed is still asynchronous
        // Before executing the done function, we first define feedOneHeader 
        beforeEach(function(done) {
            loadFeed(0, function () {
                feedOneHeader = $('.feed').find('h2').text();
                done();
            });
        });        

        // We use done() again here, since we use the asynchronous function again.
        // This time we define feedTwoHeader, after having run loadFeed(1)
        it('loads at least one entry', function(done) {
            loadFeed(1, function () {
                feedTwoHeader = $('.feed').find('h2').text();
                done();
            });

            // After loadFeed is done, we can compare the two variables to see if they have changed.
            expect(feedOneHeader).not.toEqual(feedTwoHeader);
        }); 

    });

    /*
     * A cool extra functionality would be the ability to add feeds.
     * The test suite below tests the form validation to do so.
     * validateName and validateUrl will check for valid names and urls respectively.
     */
    describe("New RSS Feed form validation", function() {
        it("returns true for valid names", function() {
            expect(validateName("Singleword")).toBeTruthy();
            expect(validateName("A regular nice sounding name")).toBeTruthy();
            expect(validateName("A combination of letters and others symbols! :)")).toBeTruthy();
        })

        it("returns false for invalid names", function() {
            // empty name should not be allowed
            expect(validateName("")).toBeFalsy();
            // name that's too long
            expect(validateName("Name that is too long should also not be allowed")).toBeFalsy();
            // name that contains no letters
            expect(validateName("*&ˆ&$#")).toBeFalsy();
            // name that already exists should also not be allowed
            expect(validateName("CSS Tricks")).toBeFalsy();
        })

        it("returns true for valid urls", function() {
            // a valid url feed should be allowed
            expect(validateUrl("http://blog.udacity.com/feed")).toBeTruthy();
            // an url with a subdomain should be allowed
            expect(validateUrl("http://feeds.feedburner.com/udacity-linear-digressions")).toBeTruthy();
            // an url with a non-.com domain should be allowed
            expect(validateUrl("http://feeds.feedburner.de/bla_bla123")).toBeTruthy();
        })

        it("returns false for invalid urls", function() {
            // an empty url should not be allowed
            expect(validateUrl("")).toBeFalsy();
            // a single word should not be allowed
            expect(validateUrl("justAString")).toBeFalsy();
            // incomplete urls should not be allowed
            expect(validateUrl("http://incompleteurl")).toBeFalsy();
            expect(validateUrl("incomplete.com/url")).toBeFalsy();
        })
    });

    /*
     * The test below tests whether the addFeed function does in fact add to allFeeds
     */
    describe("New RSS Feed", function () {
        var initialLength,
            newLength;

        // We create a test feed to add to allFeeds using addFeed
        var testFeed = {
            name: 'test name',
            url: 'http://www.test-url.com'
        }

        // After running addFeed, using testFeed, the length of allFeeds must have changed
        // i.e. initialLength must be different from newLength
        it('adds new feed to allFeeds', function() {
            initialLength = allFeeds.length;
            addFeed(testFeed);
            newLength = allFeeds.length;

            expect(initialLength).not.toEqual(newLength);
        });
    });

}());
