import http from "./http-common";

const getAll = (params) => {

  return http.get("/characters", { params });
};

export default {
	getAll
}