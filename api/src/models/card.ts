import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
    name: String,
});

export const Card = model('Card', cardSchema);
