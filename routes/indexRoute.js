const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const users = {};

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  const id = req.user.id;
  const session = req.sessionID;
  users[id] = session
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    userId: Object.keys(users),
    sessions: Object.values(users),
  });
});

router.get("/remove", isAdmin, (req, res) => {
  let session = req.query["session"].toString().replaceAll(",", "")
  let id = req.query["id"].toString().replaceAll(",", "")
  req.sessionStore.destroy(session);
  delete users[id];
  res.redirect("/admin");
});

module.exports = router;
