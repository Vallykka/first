module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: 'Сайт объявлений о продаже Всего и Вся'});
    });
}