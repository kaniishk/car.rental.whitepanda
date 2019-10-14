const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.get('/contact', controllers.home.contacts)
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //Admin routes
    app.get('/addCar', restrictedPages.hasRole('Admin'), controllers.admin.addCarGet)
    app.post('/addCar', restrictedPages.hasRole('Admin'), controllers.admin.addCarPost)
    app.get('/deleteCar', restrictedPages.hasRole('Admin'), controllers.admin.deleteCarGet)
    app.post('/deleteCar/:id', restrictedPages.hasRole('Admin'), controllers.admin.deleteCarPost)


    //Query routes
    app.get('/searchingModel', controllers.home.searchingModel)
    app.get('/searchingDate', controllers.home.searchingDate)

    //Car details
    app.get('/carDetails/:id', restrictedPages.isAuthed, controllers.carDetails.viewDetails)
    //rent car
    app.post('/takeCar/:id', restrictedPages.isAuthed, controllers.carDetails.takeCar)
    //Profile
    app.get('/profile/:id', restrictedPages.isAuthed, controllers.user.profile)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};