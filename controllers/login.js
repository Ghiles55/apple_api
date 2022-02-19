let jwt = require("jsonwebtoken");
let users = require("../models/users");

const Login = async (req, resp) => {
  let email = req.body.email || "";
  let userName = req.body.userName || "";
  let password = req.body.password || "";
  console.log(req.body, email, userName, password);
  let query;
  if (userName) {
    query = { userName: userName, password: password };
  } else if (email) {
    query = { email: email, password: password };
  }
  console.log(query)
  users.find({ email: email, password: password }, async (err, users) => {
    if (err == null && users.length > 0) {
      console.log("in if block");
      let user = users[0];
    //   let doc=new users({
    //     ...user,
    //     last_access: Date.now()
    // });
    //   await doc.save()
      let tokendata = {
        id: user._id,
        status: "success",
        last_access: user.last_access,
      };
      let token = jwt.sign(tokendata, "securepassword");
      console.log(token);
      resp.status(200).json({
        // status:'success',
        token: token,
      });
    } else {
      console.log(err, users);
      resp.status(400).json({ satus: "error" });
    }
  });
  users.findOneAndUpdate({ email: email, password: password }, {last_access: Date.now()})
};

module.exports = Login;
