const { Router } = require('express');
const loginRoutes = require('./userRoutes');
// const typesRoutes = require('./typesRoutes')
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/login', loginRoutes);


module.exports = router;