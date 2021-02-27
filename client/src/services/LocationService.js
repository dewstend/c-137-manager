import http from "./http-common";

const getAll = (params) => {

  return http.get("/locations", { params });
};

const LocationService = {
	getAll
};

export default LocationService;