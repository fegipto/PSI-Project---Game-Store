const User = require("../models/User");

exports.userlogin = (req, res) => {
  createUsers(req);
  res.send();
};

async function createUsers(req) {
    await Promise.all([
                userCreate(req),
    ]);
  }

  async function userCreate(req) {
    const nextId = await findNextId(); // wait for the promise to resolve
    const user = new User({
      id: nextId,
      name: req.body.name,
      password: req.body.password,
    });
    await user.save();
    console.log(`Added user: ${req.body.name}`);
  }




async function findNextId() {
  const users = await User.find({}, { id: 1, _id: 0 }).sort({ id: 1 }).lean();
  let nextId = 1;
  for (const user of users) {
    if (user.id !== nextId) {
      return nextId;
    }
    nextId++;
  }
  return nextId;
}



  