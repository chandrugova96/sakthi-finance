const initializeRoutes = (app) => {
    app.use('/v1/auth', require('./v1/auth.routes'));
    app.use('/v1/village', require('./v1/village.routes'));
};

module.exports = initializeRoutes;