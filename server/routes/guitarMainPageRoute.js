import express from 'express';
import { guitarMainModel } from '../models/guitarMainModel.js';

const guitarMainRouter = express.Router();

guitarMainRouter.get('/', async (req, res) => {
    const {limit, skip} = req.query;
    
    try {
        const guitarCart = await guitarMainModel.find({}).limit(Number(limit)).skip(Number(skip))
        
        if( !guitarCart || guitarCart.length === 0 ) return res.status(400).json({ response: 'No guitars found'});
        res.status(200).json({mainPageData: guitarCart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the guitars' });
    }
});

export default guitarMainRouter;