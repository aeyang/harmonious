
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  sass = require('node-sass'),
  consolidate = require('consolidate'),
  dust = require('dustjs-linkedin'),
  template_engine = 'dust';

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// Register the given template engine callback as ext. By default will require() the engine based on the file extension.
// Not exactly sure what this does, just know I need it.
app.engine('dust', consolidate.dust);
app.set('view engine', template_engine);    //
app.set('template_engine', template_engine);//Whats the difference between these two?
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(sass.middleware({
  src: __dirname + '/sass',
  dest: __dirname + '/public/stylesheets',
  debug: true,
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
