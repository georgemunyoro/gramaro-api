const { getDatabaseConnection } = require("./connection");
const bcrypt = require("bcrypt");

const getUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const databaseConnection = getDatabaseConnection();
      const { rows: user } = await databaseConnection.query(
        `SELECT ID, USERNAME, PASSWORD FROM USERS WHERE EMAIL=${email}`
      );
      resolve(user);
    } catch (error) {
      reject(null);
    }
  });
};

const checkIfPasswordCorrect = async (user, password) => {
  try {
    const isCorrect = await bcrypt.compare(password, user.password);
    return isCorrect;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUser,
  getNote,
  checkIfPasswordCorrect
};
