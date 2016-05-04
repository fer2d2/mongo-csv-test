var json2csv = require('json2csv');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://10.98.101.150:27017/open010_mad_desa';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");

  var collectionNames = ["Request", "Service"];

  collectionNames.forEach(function(collectionName) {
    var collection = db.collection(collectionName);

    collection.find().toArray(function(err, results) {
        console.info("### INFO FOR "+collectionName+" ###")
        console.info(JSON.stringify(results));

        json2csv({ data: results, flatten: true, del: ';'}, function(err, csv) {
          if (err) console.log(err);
          fs.writeFile(collectionName+'.csv', csv, function(err) {
              if (err) throw err;
              console.log('file saved');
            });
        });

    });
  });

});
