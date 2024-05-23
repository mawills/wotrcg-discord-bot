import { Router, Request, Response } from 'express';
import { Card } from '../models/card';


const route = Router()

route.post('/', async (req: Request, res: Response) => {
    const card = await Card.create({
        title: 'test card 1',})
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
        const posts = await Card.find({})
        res.send(posts);
    } catch (e) {
        res.status(500).send(e);
    }
});

// update

// delete

export default route;