const express = require('express');
const util = require('../util');

const locations = express.Router();

const Location = require('../models/').Location;

locations.get('/', (req, res) => {
  const page = parseInt(req.query.page || 1);
  const pagination = util.getPagination(page, req.query.size);

  Location.findAndCountAll({
    limit: pagination.limit,
    offset: pagination.offset
  })
    .then(locations => {
      if (locations) {
        res.send({
          ...util.getPagingData(page, locations.count, pagination.limit, req),
          ...locations
        });
      } else {
        res.status(404).json('No locations found');
      }
    })
    .catch(err => {
      res.status(500).json('Locations Internal API error: ' + err);
    });
});

locations.get('/:location_id', (req, res) => {
  Location.findOne({
    where: {
      id: req.params.location_id
    }

  })
    .then(location => {
      if (location) {
        res.send(location);
      } else {
        res.status(400).json('Location does not exist');
      }
    })
    .catch(err => {
      res.status(400).json('Locations search error: ' + err);
    });
});

module.exports = locations;
