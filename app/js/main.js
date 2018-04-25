require.config({
  paths: {
    'domReady': 'vendor/domReady'
    // 'jquery': 'vendor/jquery-3.2.1.min.js'
  }
});

var modules = [
  'domReady'
  // 'jquery'
];

require(moduls, function(domReady) {
  domReady(function() {
    console.log('gulp-with-require');
  });
});