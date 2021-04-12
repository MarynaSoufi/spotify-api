import Users from "../../lib/Users.js";
import parseUser from "../../helpers/parseUser.js";
/* Variables */
const usersDB = new Users();
/**
 * get all users(for admin)
 * @param {*} req 
 * @param {*} res 
 */
export const getUsers = async (req, res) => {
  try{
    const role = req.role;
    if(role){
      const users = await usersDB.get();
      res.status(200).json(users);
    }else {
      res.status(403).json({ error: 'You are not admin' });
    }
  }catch(message){
    res.status(404).json({ error: message.toString() });
  }

};
/**
 * get user by id(for admin)
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async (req, res) => {
  try {
    const role = req.role;
    const userID = req.params.id;
    console.log(userID);
    if(role) {
      const user = await usersDB.get(userID);
      if (!user) throw new Error("User not found");
      res.status(200).json(user);
    }else {
      res.status(403).json({ error: 'You are not admin'});
    }
    
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};
/**
 * get user(self)
 * @param {*} req 
 * @param {*} res 
 */
export const getUserSelf = async (req, res) => {
  try {
    const userID = req.userId;
    console.log(userID);
      const user = await usersDB.get(userID);
      if (!user) throw new Error("User not found");
      res.status(200).json(user);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};
/**
* Update user by id
*/
export const updateUser = async (req, res) => {
  try {
      const user = parseUser(req, res);
      const { name, email, password} = user;
      const id = req.userId;
      const updateUser = await usersDB.update(id, name, email, password);
      res.status(200).json({ usersDB: updateUser });
  } catch({ message }) {
      res.status(500).json({ error: message});
  }
};
/**
 * add new user
 * @param {*} request 
 * @param {*} response 
 */
export const addUser = async (request, response) => {
  try {
      const user = parseUser(request);
      const { name, email, password, isAdmin} = user;
      const newUser = await usersDB.add(name, email, password, isAdmin);
      response.status(201).json({ usersDB: newUser});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};

/**
 * delete user(self)
 * @param {*} request 
 * @param {*} response 
 */
export const deleteUserSelf = async (request, response) => {
  try {
      const id = request.userId;
      await usersDB.delete(id);
      response.status(204).end();
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};

/**
 * delete user by id(for admin)
 * @param {*} request 
 * @param {*} response 
 */
export const deleteUser = async (request, response) => {
  try {
      const role = request.role;
      const id = request.params.id;
      if(role) {
        await usersDB.delete(id);
        response.status(204).end();
      }else {
        response.status(500).json({ error: 'You are not admin'});
      }
      
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};