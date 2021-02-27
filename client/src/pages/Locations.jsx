import React, { useState, useEffect } from "react";

import LocationService from "../services/LocationService";
import EntityTable from "../components/EntityTable";

function Locations() {

  const [locations, setLocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const retrieveLocations = () => {
    const params = { page: currentPage };

    LocationService.getAll(params)
      .then((res) => {
        setLocations(res.data.rows);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.pages);
        setProperties(Object.keys(locations[0]));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveLocations, [currentPage, totalPages]);

  return (
    <React.Fragment>
      <h1>Lugares</h1>
      {locations && (
        <EntityTable entities={locations} {...{setCurrentPage, totalPages, currentPage, properties}}/>
      )}
    </React.Fragment>
  );
}

export default Locations;
