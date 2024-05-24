import { Router, Request, Response } from 'express';
import { Card } from '../models/card';

const route = Router()

route.post('/', async (req: Request, res: Response) => {
  let data = require('../data/cards.json');
  const cards = await Card.insertMany(data)
    .then(result => {
      console.log("db seeded");
    })
    .catch(e => {
      console.error("failed to create cards");
    })
  
    res.status(201).send(cards);
})

route.get('/', async (req: Request, res: Response) => {
    try {
        const cards = await Card.find({});
        res.send(cards);
    } catch (e) {
        res.status(500).send(e);
    }
});

route.delete('/', async (req: Request, res: Response) => {
  await Card.deleteMany({})
    .then(() => {
      console.log('db wiped');
    })
    .catch(e => {
      console.error('error wiping db');
    });

  res.status(204).send();
})

export default route;
