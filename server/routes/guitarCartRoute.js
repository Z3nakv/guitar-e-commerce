import express from 'express';
import { guitarCartModel } from '../models/guitarCartModel.js';
import { guitarMainModel } from '../models/guitarMainModel.js';

const guitarRouter = express.Router();

guitarRouter.get('/', async (req, res) => {
    try {
        const guitarsInCart = await guitarCartModel.find({});
        if( !guitarsInCart ) {
            return res.status(400).json({ response: 'No guitars found'});
        }
        return res.status(200).json({ cartData : guitarsInCart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the guitars' });
    }
});

guitarRouter.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const guitarProduct = await guitarCartModel.findOne({ guitarId : id })
        const guitarMain = await guitarMainModel.findOne({_id: id})
        // console.log(guitarProduct, guitarMain);
        const newItem = {...guitarMain.toObject(), quantity: guitarProduct ? guitarProduct.quantity : 1}
        if( !newItem ) return res.status(400).json({ response: 'No guitars found'});
        return res.status(200).json({ guitarInCart : newItem});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the guitars' });
    }
    
});

guitarRouter.post('/', async (req, res) => {
    
    const { guitar } = req.body;

    const cartItem = await guitarCartModel.findOne({ guitarId: guitar._id });

    try {
        if( !cartItem ){
            const newGuitarItem = await guitarCartModel.create({ 
                name: guitar.name,
                image: guitar.image,
                description: guitar.description,
                price: guitar.price,
                guitarId: guitar._id, 
                quantity: guitar.quantity || 1 
            });

            return res.status(201).json( newGuitarItem )
        }else {
            if( cartItem.quantity >= 5 ) return;
            const updatedCart = await guitarCartModel.findOneAndUpdate( {_id:cartItem._id,  quantity: { $lt: 5 }}, { $inc: { quantity: 1 } })

            
            return res.status(200).json( updatedCart );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error has ocurred!'})
    }
});

guitarRouter.put('/increase/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await guitarCartModel.findOneAndUpdate({_id: id, quantity: { $lt: 5 }},{ $inc: { quantity: 1 }});
        if( !response ) return res.status(404).json({ error: 'An error has ocurred' });
        res.status(200).json({ response: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error has ocurred'});
    }
});

guitarRouter.put('/decrease/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await guitarCartModel.findOneAndUpdate({_id: id, quantity: { $gt: 1 }},{ $inc: { quantity: - 1 }});
        if( !response ) return res.status(404).json({ error: 'An error has ocurred' });
        res.json({ response: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error has ocurred'});
    }
});

guitarRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await guitarCartModel.findOneAndDelete({ _id: id });
        if( !response ) return res.status(400).json({ response: 'something wwnt wrong!'});
        res.status(200).json({ response: response });
    } catch (error) {
        console.log(error);
    }
});

guitarRouter.delete('/', async (req, res) => {
    try {
        const result = await guitarCartModel.deleteMany();
        if( !result ) return res.status(400).json({ response: 'something wwnt wrong!'});
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
    }
})

export default guitarRouter;