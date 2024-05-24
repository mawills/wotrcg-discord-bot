import { Schema, model } from 'mongoose';
import { Team, Faction } from '../enums/enums';

const battlegroundSchema = new Schema({
    allowedFactions: {
        type: [String],
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
        ],
        required: true,
    },
    artist: String,
    cardNumber: String,
    defense: Number,
    imageUrl: String,
    name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        enum: [Team.SHADOW, Team.FREE_PEOPLES],
        required: true,
    },
    text: String,
    victoryPoints: Number,
});

export const Battleground = model('Battleground', battlegroundSchema);
