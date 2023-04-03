const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getUsers() {
  const rows = await db.query(
    `SELECT * FROM Users`
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

async function getPosts() {
  const rows = await db.query(
    `SELECT * FROM Posts`
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

async function createUser(user) {
  const result = await db.query(
    `INSERT INTO Users 
    (username, profilePic)
    VALUES 
    ("${user.username}", "${user.profilePic}")`
  );

  let message = "Error in creating new user";

  if (result.affectedRows) {
    message = await db.query(
      `SELECT userId FROM Users WHERE username="${user.username}"`
    );
  }

  return message;
}

async function createPost(post) {
  const result = await db.query(
    `INSERT INTO Posts 
    (userId, message)
    VALUES 
    (${post.userId}, "${post.message}")`
  );

  let message = "Error in creating new post";

  if (result.affectedRows) {
    message = "Post created successfully";
  }

  return { message };
}

module.exports = {
  getUsers,
  createUser,
  getPosts,
  createPost,
};
