import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Pagination from "@material-ui/lab/pagination";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "60vh",
    marginBottom: "1em",
  },
  properties: {
    textTransform: 'capitalize'
  }
}));

function EntityTable(props) {
  const classes = useStyles();

  const { setCurrentPage, properties, entities, totalPages, currentPage } = props;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {properties.slice(2).length &&
                properties
                  .slice(2, properties.length - 2)
                  .map((property) => (
                    <TableCell className={classes.properties} align="right">{property}</TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell align="left">{entity.id}</TableCell>
                <TableCell component="th" scope="row">
                  {entity.name}
                </TableCell>
                {properties.slice(2).length &&
                Object.values(entity)
                  .slice(2, properties.length - 2)
                  .map((value) => (
                    <TableCell align="right">{value}</TableCell>
                  ))}
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
  );
}

export default EntityTable;
