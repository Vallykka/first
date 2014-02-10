module.exports = function (app) {
    app.get('/company', function(req, res) {
        res.render('company', {title: 'О компании', cont: 'О компании'});
    });
}