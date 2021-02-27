import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CharacterService from "../services/CharacterService";

import Pagination from "@material-ui/lab/pagination";

const useStyles = makeStyles({
  container: {
    height: "60vh",
    marginBottom: "1em",
  },
  table: {
  },
});

function Characters() {
  const classes = useStyles();

  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const retrieveCharacters = () => {
    const params = { page: currentPage };

    CharacterService.getAll(params)
      .then((res) => {
        setCharacters(res.data.rows);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.pages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(retrieveCharacters, [currentPage, totalPages]);

  return (
    <React.Fragment>
      <h1>Personajes</h1>
      {characters && (
        <React.Fragment>
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Personaje</TableCell>
                  <TableCell align="right">Género</TableCell>
                  <TableCell align="right">Especie</TableCell>
                  <TableCell align="right">Estado</TableCell>
                  <TableCell align="right">Tipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characters.map((character) => (
                  <TableRow key={character.id}>
                    <TableCell align="left">{character.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {character.name}
                    </TableCell>
                    <TableCell align="right">{character.gender}</TableCell>
                    <TableCell align="right">{character.species}</TableCell>
                    <TableCell align="right">{character.status}</TableCell>
                    <TableCell align="right">{character.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Characters;
