require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
// serve up static file
app.use(express.static('public'));
app.use('/*/styles.css', express.static('public/styles.css'));
app.use('/*', express.static('public'));

//
// app.use(express.static(__dirname + '/../client/dist'));
// app.use('/*/styles.css', express.static(__dirname + '/../client/dist/styles.css'));
// app.use('/*', express.static(__dirname + '/../client/dist'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});



// video carousel
const videoCarouselOptions = {
  target: 'http://ec2-3-17-6-177.us-east-2.compute.amazonaws.com:3333',
  // changeOrigin: true
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/associatedVideos', videoCarouselProxy);


const castCrewOptions = {
  target: 'http://ec2-3-16-216-163.us-east-2.compute.amazonaws.com',
  // changeOrigin: true
};
const castCrewProxy = proxy(castCrewOptions);
app.use('/actors', castCrewProxy);


const movieInfoOptions = {
  target: 'http://ec2-18-191-62-132.us-east-2.compute.amazonaws.com:2000',
  // changeOrigin: true
};
const movieInfoProxy = proxy(movieInfoOptions);
app.use('/movies', movieInfoProxy);