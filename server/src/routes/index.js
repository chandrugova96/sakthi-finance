const initializeRoutes = (app) => {
    app.use('/v1/auth', require('./v1/auth.routes'));
};

module.exports = initializeRoutes;