var algoliasearch = require('algoliasearch');

var client = algoliasearch("9HOA31XFL6", "0e1be579f8af57d9919139301f0c1b25");
var index = client.initIndex('videos');

console.log(index);