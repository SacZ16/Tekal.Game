const { Router } = require('express');
const router = Router()
/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get('/', (req, res) => {
    res.send('Hello World')
})



module.exports = router;