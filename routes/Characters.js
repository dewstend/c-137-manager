const express = require('express');
const util = require('../util');

const characters = express.Router();

const Character = require('../models/').Character;

characters.get('/', (req, res) => {
  const page = parseInt(req.query.page || 1);
  const pagination = util.getPagination(page, req.query.size);

  Character.findAndCountAll({
    limit: pagination.limit,
    offset: pagination.offset
  })
    .then(characters => {
      if (characters) {
        res.send({
          page,
          ...util.getPagingData(page, characters.count, pagination.limit, req),
          ...characters
        });
      } else {
        res.status(404).json('No characters found');
      }
    })
    .catch(err => {
      res.status(500).json('Characters Internal API error: ' + err);
    });
});

characters.get('/:character_id', (req, res) => {
  Character.findOne({
    where: {
      id: req.params.character_id
    }

  })
    .then(character => {
      if (character) {
        res.send(character);
      } else {
        res.status(404).json('Character does not exist');
      }
    })
    .catch(err => {
      res.status(500).json('Characters search error: ' + err);
    });
});

module.exports = characters;
