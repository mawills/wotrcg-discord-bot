import { Router, Request, Response } from 'express';
import { Card } from '../models/card';
import { Battleground } from '../models/battleground';
import { Path } from '../models/path';

const route = Router()

// for testing purposes, delete me.
route.post('/seed', async (req: Request, res: Response) => {
  let battlegroundData = require('../data/battlegrounds.json');
  let cardData = require('../data/cards.json');
  let pathData = require('../data/paths.json');
  
  await Battleground.insertMany(battlegroundData)
    .then(() => {
      console.log("battleground data added");
    })
    .catch(e => {
      console.error("failed to create battlegrounds");
    })
  
  await Card.insertMany(cardData)
    .then(() => {
      console.log("card data added");
    })
    .catch(e => {
      console.error("failed to create cards");
    })

  await Path.insertMany(pathData)
    .then(() => {
      console.log("path data added");
    })
    .catch(e => {
      console.error("failed to create paths");
    })
  
  res.status(201).send();
})

route.get('/', async (req: Request, res: Response) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send();
  }

  try {
    const [battleground, card, path] = await Promise.all([
      Battleground.findOne({ name: name }),
      Card.findOne({ name: name }),
      Path.findOne({ name: name }),
    ])

    if (battleground) {
      res.send(battleground);
    } else if (card) {
      res.send(card);
    } else if (path) {
      res.send(path);
    } else {
      res.status(404).json({ "message": "document not found." });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// todo: for testing purposes, delete me.
route.delete('/drop', async (req: Request, res: Response) => {
  await Battleground.deleteMany({})
    .then(() => {
      console.log('battlegrounds deleted');
    })
    .catch(e => {
      console.error('error deleting battlegrounds');
    });
  
  await Card.deleteMany({})
    .then(() => {
      console.log('cards deleted');
    })
    .catch(e => {
      console.error('error deleting cards');
    });
  
  await Path.deleteMany({})
    .then(() => {
      console.log('paths deleted');
    })
    .catch(e => {
      console.error('error deleting paths');
    });

  res.status(204).send();
})

export default route;
