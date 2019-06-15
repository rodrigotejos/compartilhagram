const Post = require('../models/Post');
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')


// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

bucket = "instagram-sp-2";

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: bucket, Key: '', Body: ''};

module.exports = {
    async index(req, res){
        const post = await Post.find().sort('-createdAT')
        return res.json(post)
    },
    async store(req, res){
        const {author, place, description, hashtags } = req.body;
        const {filename: image} = req.file;

        const [name, ext] = image.split('.');
        const filename = `${name}.jpg`;

        //return res.json(req.file);

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        const file = req.file.destination + '/resized/'+ filename;

        // Configure the file stream and obtain the upload parameters
        var fileStream = fs.createReadStream(file);
        fileStream.on('error', function(err) {
        console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = path.basename(file);

        // call S3 to retrieve upload file to specified bucket
        
        s3.upload (uploadParams, function (err, data) {
            if (err) {
               console.log("Error", err);
            } if (data) {
             console.log("Upload Success", data.Location);
            }
        });
        
       
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(file);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        req.io.emit('post', post);

        return res.json(post)
    }
}