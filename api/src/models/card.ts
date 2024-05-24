import { Schema, model } from 'mongoose';
import { Team, Faction } from '../enums/enums';

const cardSchema = new Schema({
    allowedPaths: [Number],
    artist: String,
    attack: Number,
    cardNumber: String,
    defense: Number,
    faction: {
        type: String,
        enum: [
            Faction.DUNEDAIN,
            Faction.ELF,
            Faction.HOBBIT,
            Faction.ISENGARD,
            Faction.MONSTEROUS,
            Faction.MORDOR,
            Faction.ROHAN,
            Faction.SOUTHRON,
            Faction.WIZARD,
        ]
    },
    flavorText: String,
    imageUrl: String,
    leadershipAttack: Number,
    leadershipDefense: Number,
    name: {
        type: String,
        required: true,
    },
    pathAttack: Number,
    pathDefense: Number,
    team: {
        type: String,
        enum: [Team.SHADOW, Team.FREE_PEOPLES],
        required: true,
    },
    text: String,
    type: {
        type: String,
        required: true,
    },
});

export const Card = model('Card', cardSchema);
