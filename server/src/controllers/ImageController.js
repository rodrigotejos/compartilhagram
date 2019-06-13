const Post = require('../models/Post');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

bucket = "instagram-sp-2";

module.exports = {

    async get(req, res){
        
        var params = {Bucket: bucket, Key: req.params.image};
        
        s3.getObject(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.write(data.Body, 'binary');
                res.end(null, 'binary');
            }              // successful response
          });
        return res
    }
}