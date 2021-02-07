const { getDatabaseConnection } = require("../utils/db/connection");

const handleEmptyData = (req, res) => {
  res.json({
    message: "insufficient user information",
    data: req.body,
  });
};

const handleUnexpectedError = (res, error) => {
  res.json({
    message: "An unexpected error ocurred",
    data: {
      stack: error.stack || null,
    },
  });
};

const fetchUsers = async (callback) => {
  try {
    const client = getDatabaseConnection();
    const { rows: users } = await client.query("SELECT * FROM USERS");
    client.end();
    callback(false, users);
  } catch (error) {
    callback(error, null);
  }
};

module.exports = {
  fetchUsers: fetchUsers,
  handleUnexpectedError: handleUnexpectedError,
  handleEmptyData: handleEmptyData,
};
