import { http,tokenBearer } from "../http";
import { userKey } from "../../shared/global";

const _getUsers = async () => {
  return await http
    .get("/users",tokenBearer())
    .then((response) => response)
    .catch((error) => error);
};
const _getUserById = async (payload) => {
   return await http
    .get(`/users/${payload}`,tokenBearer())
    .then((response) => response)
    .catch((error) => error);
};
const _getUserByEmail = async (payload) => {
  return await http
    .get(`/users/search?email=${payload}`,tokenBearer())
    .then((response) => response)
    .catch((error) => error);
};

const _getUserLoggedIn = async () => {
   return await http
    .get(`/users/loggedin`,tokenBearer())
    .then((response) => response)
    .catch((error) => error);
};

export default {
  _getUserByEmail,
  _getUserById,
  _getUsers,
  _getUserLoggedIn
};
