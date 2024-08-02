const express = require("express");
const router = express.Router();
const queries = require("../services/queries");

/* GET all users */
router.get("/Users", async function (req, res, next) {
  try {
    res.json(await queries.getUsers());
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

/* POST a user */
router.post("/User", async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await queries.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* GET all posts */
router.get("/Posts/:page", async function (req, res, next) {
  try {
    console.log("Get Posts ", req.params.page);
    res.json(await queries.getPosts(req.params.page));
  } catch (err) {
    console.error(`Error while getting posts`, err.message);
    next(err);
  }
});

/* POST a post */
router.post("/Post", async function (req, res, next) {
  try {
    res.json(await queries.createPost(req.body));
  } catch (err) {
    console.error(`Error while creating post`, err.message);
    next(err);
  }
});

module.exports = router;
