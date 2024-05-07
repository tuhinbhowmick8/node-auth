import {Router} from 'express';
const router = Router();

router.get('/', (req, res, next) => {
    res.json({ status: 1, message: "Hello world....." })
});

export default router;