const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef_', 10);
const { getDatabase } = require("../database");

const handleEmptyData = (req, res) => {
  const { username, password, email } = req.body;
  res.json({
	message: "insufficient user information",
	data: {
	  username: username || null,
	  password: password || null,
	  email: email || null
	}
  })
};

const handleUnexpectedError = (res, error) => {
  res.json({
	message: "An unexpected error ocurred",
	data: {
	  stack: error.stack || null
	}
  })
}

const fetchUsers = async (callback) => {
  try {
	const client = getDatabase();
	const { rows: users } = await client.query("SELECT * FROM USERS");
	client.end();
	callback(false, users);
  } catch (error) {
	callback(error, null);
  }
}

module.exports = {
  fetchUsers: fetchUsers,
  handleUnexpectedError: handleUnexpectedError,
  handleEmptyData: handleEmptyData
};

