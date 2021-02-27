import http from "./http-common";

const getAll = (params) => {

  return http.get("/characters", { params });
};

const CharacterService = {
	getAll
};

export default CharacterService;