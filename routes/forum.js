module.exports = function (app) {
    var topicProvider = new TopicProvider('localhost', 27017);
    app.get('/forum', function (req, res) {
        topicProvider.findAll(function (error, docs) {
            res.render('forum', { title: 'Объявления',
                topics: docs
            });

        });
    });
        
    app.get('/forum/:id', function (req, res) {
     topicProvider.findById(req.param('id'), function (error, top) {
      res.render('topic', {
         title: top.topic,
         topic: top
      });
      });
    });
    app.post('/forum/addPost', function (req, res) {
        topicProvider.addPostToTopic(req.param('_id'), {
            author: req.param('author'),
            post: req.param('post'),
            created_at: new Date().toLocaleDateString() + ' ' + (new Date().toLocaleTimeString())
        }, function (error, docs) {
            res.redirect('/forum/' + req.param('_id'))
        });
    });
    

}