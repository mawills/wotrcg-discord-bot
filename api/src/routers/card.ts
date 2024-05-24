import { Router, Request, Response } from 'express';
import { Card } from '../models/card';

const route = Router()

route.post('/', async (req: Request, res: Response) => {
    const card = await Card.create({
        name: 'test card 3',})
      .then(result => {
        console.log("card created", result)
      })
      .catch(e => {
        console.error('Failed to create card', e);
      })
    
      res.status(201).send(card);
})

route.get('/', async (req: Request, res: Response) => {
    try {
        const cards = await Card.find({})
        res.send(cards);
    } catch (e) {
        res.status(500).send(e);
    }
});

export default route;
