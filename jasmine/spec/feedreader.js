/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   // This test is to make sure that the allFeeds variable has been defined
   // and that it is not empty.
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
           var urlDef = allFeeds.forEach(function(feed) {
             expect(feed["url"]).toBeDefined();
             expect(feed["url"].length).not.toBe(0);
           })
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {
           var nameDef = allFeeds.forEach(function(feed) {
             expect(feed["name"]).toBeDefined();
             expect(feed["name"].length).not.toBe(0);
           })
         });

    });


    // A test suite to test "The menu" element
    describe('The menu', function() {
      /* A test that ensures the menu element is hidden by default.
       */
       it('is hidden', function() {
         expect(document.body).toHaveClass('menu-hidden');
       });

       /* A test that ensures the menu changes visibility when the menu
        * icon is clicked.
        */
        it('changes visibility', function() {
          menuIcon = $('.menu-icon-link');
          menuIcon.trigger('click');
          expect(document.body).not.toHaveClass('menu-hidden');
          menuIcon.trigger('click');
          expect(document.body).toHaveClass('menu-hidden');
        });
    });


    // A test suite to test the loadFeed function that ensures when the loadFeed
    //function is called and completes its work, there is at least a single
    //.entry element within the .feed container.
    describe('Initial Entries', function() {

       beforeEach(function(done) {
          loadFeed(0, function() {
               done();
          })
       });

       it('has atleast one entry', function(){
         expect($('.feed.entry')).not.toBe(0);
       });
   });


  // A test suite named "New Feed Selection" that ensures when a new feed is loaded
  //by the loadFeed function, the content actually changes.
  describe('New Feed Selection', function() {

     var oldFeed;
     var newFeed;

     beforeEach(function(done) {
        loadFeed(1, function() {
          newFeed = $('.feed').html();
          done();
        })
     });

     it('content changes when new feed loaded', function() {
       loadFeed(0, function() {
         oldFeed = $('.feed').html();
       });
       expect(oldFeed).not.toEqual(newFeed);
     })
  });
}());
