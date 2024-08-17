import { mongoose, Schema } from 'mongoose';

const guitarSchema = new Schema({
    name: {type:String,required: true},
    image: {type:String,required: true},
    description: {type:String,required: true},
    price: {type:Number,required: true}
});

export const guitarMainModel = mongoose.model('mainPageGuitars', guitarSchema);