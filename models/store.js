const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const { Schema } = mongoose; 

const storeSchema = mongoose.Schema({
  fName: {
    type: String,
    require: true
  },
  lName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true,
    unique: true
  },
  address: {
    type: String,
    require: true
  },
  password1: {
    type: String,
    require:true
  },
  active: Boolean
});

module.exports = mongoose.model("Store", storeSchema)
module.exports.hashPassword = async (password1) => {
  try {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password1, salt)
  } catch (error) {
    console.log(error)
    throw new Error("Hashing Failed")
  }
}

module.exports.comparePasswords = async (password1, hashPassword) => {
  try {
    return await bcrypt.compare(password1, hashPassword)
  } catch (error) {
    throw new Error("Comparing Failed", error)
  }
}
// module.exports = {Store: mongoose.model("store", storeSchema)};