const bcrypt = require("bcrypt");
const saltRounds = 8;

function hashPassword(password) {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
}

function checkPassword(password, hashPwd) {
  try {
    return bcrypt.compareSync(password, hashPwd);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  hashPassword,
  checkPassword
};
