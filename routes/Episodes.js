const express = require('express');
const util = require('../util');

const episodes = express.Router();

const Episode = require('../models/').Episode;

// CREATE
episodes.post('/new', (req, res) => {

  const episodeData = {
    name: req.body.name,
    air_date: req.body.air_date,
    episode: req.body.episode
  };

  Episode.create(episodeData)
  .then(episode => {
    res.json(
    { 
      status: `${episode.id}: ${episode.episode} added'`,
      episode_id: episode.id
    }
    );
  })
  .catch(err => {
    res.send('Episode creation error: ' + err);
  });
});

// READ
episodes.get('/', (req, res) => {
  const page = parseInt(req.query.page || 1);
  const pagination = util.getPagination(page, req.query.size);

  Episode.findAndCountAll({
    limit: pagination.limit,
    offset: pagination.offset
  })
  .then(episodes => {
    if (episodes) {
      res.send({
        page,
        ...util.getPagingData(page, episodes.count, pagination.limit, req),
        ...episodes
      });
    } else {
      res.status(404).json('No episodes found');
    }
  })
  .catch(err => {
    res.status(500).json('Episodes Internal API error: ' + err);
  });
});

episodes.get('/:episode_id', (req, res) => {
  Episode.findOne({
    where: {
      id: req.params.episode_id
    }

  })
  .then(episode => {
    if (episode) {
      res.send(episode);
    } else {
      res.status(404).json('Episode does not exist');
    }
  })
  .catch(err => {
    res.status(500).json('Episodes Internal API error: ' + err);
  });
});

// Update
episodes.put('/:episode_id', (req, res) => {
  const episode_id = req.params.episode_id;
  Episode.update(
    {...req.body,
      updatedAt: new Date()
    },
    {
      where: {
        id: req.params.episode_id
      }

    })
  .then(episode => {
    if (episode) {
      res.status(200).json(`Episode id: ${episode_id} updated successfully`);
    } else {
      res.status(400).json('Error updating episode. Information invalid');
    }
  })
  .catch(err => {
    res.status(500).json('Episodes Internal API error: ' + err);
  });
});



// Delete
episodes.delete('/:episode_id', (req, res) => {
  const episode_id = req.params.episode_id;
  Episode.destroy({
    where: { 
      id: episode_id
    }})
  .then(episode => {
    if (episode) {
      res.status(200).json(`Episode id: ${episode_id} deleted successfully`);
    } else {
      res.status(404).json('Episode does not exist');
    }
  })
  .catch(err => {
    res.status(500).json('Episodes Internal API error: ' + err);
  });
});

module.exports = episodes;
