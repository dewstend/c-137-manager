import React, { useState, useEffect } from "react";

import CharacterService from "../services/CharacterService";
import EntityTable from "../components/EntityTable";

function Characters() {

  const [characters, setCharacters] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const retrieveCharacters = () => {
    const params = { page: currentPage };

    CharacterService.getAll(params)
      .then((res) => {
        setCharacters(res.data.rows);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.pages);
        setProperties(Object.keys(characters[0]));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveCharacters, [currentPage, totalPages]);

  return (
    <React.Fragment>
      <h1>Personajes</h1>
      {characters && (
        <EntityTable entities={characters} {...{setCurrentPage, totalPages, currentPage, properties}}/>
      )}
    </React.Fragment>
  );
}

export default Characters;
