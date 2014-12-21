//Modules
var fs = require('fs');
var express = require('express');
var http = require('http');

//Logger
var logger = {
  setup: function(env, enabled) {
    logger.stream = fs.
      createWriteStream(__dirname + '/logs/' + env + '.log', {flags: 'a'});
    logger.enabled = enabled;
  },
  log: function(str) {
    if(logger.enabled) {
      console.log(str);
      logger.stream.write('\n' + str);
    } else {
      logger.stream.write('\n' + str);
    }
  }
};

//Setup Logger
logger.setup('production', false);

//Initialize Server
var server = express();

//Server Setup
server.use(function(req, res, next) {
  var str;
  str = '';
  str += req.method + ' ';
  str += req.headers.host + req.originalUrl;
  logger.log(str);
  next();
});

//Website Assets: html,css,images,javascripts,sound effects
server.use(express.static(__dirname + '/public'));
server.use(express.static(__dirname + '/public/css'));
server.use(express.static(__dirname + '/public/img'));
server.use(express.static(__dirname + '/public/js'));
server.use(express.static(__dirname + '/public/fonts'));
server.use(express.static(__dirname + '/public/sfx'));

//Template Engine Setup
server.set('views', __dirname + '/public/views');
server.set('view engine', 'jade');

server.get('/', function(req, res) {
  res.render('where_to', { pageTitle: 'Where To?' });
});

server.get('/creative_photography', function(req, res) {
  res.render('photography', { pageTitle: 'The Creative Photographer' });
});

server.get('/bridal_hair_stylist', function(req, res) {
  res.render('stylist', { pageTitle: 'The Bridal Hair Stylist' });
});

server.get('/contact_annie', function(req, res) {
  res.render('contact', { pageTitle: 'Let Me Help' });
});


//Start the server
var port = 3005;
var httpServer = http.createServer(server);

httpServer.listen(port, function(e) {
  logger.log('Server listening on port: ' + port);
});
