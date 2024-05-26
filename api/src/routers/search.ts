import { Router, Request, Response } from 'express';
import { Card } from '../models/card';
import { Battleground } from '../models/battleground';
import { Path } from '../models/path';

const route = Router()



route.get('/', async (req: Request, res: Response) => {
  if (!req.query.q) {
    res.status(400).send();
  }
  const query = req.query.q?.toString().toLowerCase();
  if (query) {
    console.log("searching for:", query);
    try {
      const [battleground, card, path] = await Promise.all([
        Battleground.findOne({ searchTerms: query }),
        Card.findOne({ searchTerms: query }),
        Path.findOne({ searchTerms: query }),
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
  }
});

// for development purposes, delete me.
route.post('/seed', async (req: Request, res: Response) => {
  let battlegroundData = require('../data/battlegrounds.json');
  let cardData = require('../data/cards.json');
  let pathData = require('../data/paths.json');
  
  await Battleground.insertMany(battlegroundData)
    .then(() => console.log("battleground data added"))
    .catch(e => console.error("failed to create battlegrounds", e))
  
  await Card.insertMany(cardData)
    .then(() => console.log("card data added"))
    .catch(e => console.error("failed to create cards", e));

  await Path.insertMany(pathData)
    .then(() => console.log("path data added"))
    .catch(e => console.error("failed to create paths", e));
  
  res.status(201).send();
})

// todo: for development purposes, delete me.
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
