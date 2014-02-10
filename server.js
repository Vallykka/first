var express = require('express');
var path = require('path');
var TopicProvider = require('./advertisement-mongodb');
var app = module.exports = express.createServer();


app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});
app.configure('development', function () {
  app.use(express.errorHandler());
});
require('./routes/home')(app);
require('./routes/company')(app);
require('./routes/forum')(app);


app.listen(333);
console.log('listening to http://localhost:333');