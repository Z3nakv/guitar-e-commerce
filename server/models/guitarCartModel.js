import { mongoose, Schema } from 'mongoose';

const guitarCartSchema = new Schema({
    name: {type:String,required: true},
    image: {type:String,required: true},
    description: {type:String,required: true},
    price: {type:Number,required: true},
    guitarId: { type: mongoose.Schema.Types.ObjectId, ref: 'mainPageGuitars', required: true },
    quantity: { type: Number, default: 1 }
});

export const guitarCartModel = mongoose.model('cartGuitars', guitarCartSchema);