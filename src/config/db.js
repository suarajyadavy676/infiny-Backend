const {connect} =require("mongoose")
const dbConnection = async()=>{
  try {
    await connect(process.env.DATABASE_URL)
    console.log("db is connected")
  } catch (error) {
    console.log("db is not connected")
  }
}

module.exports = dbConnection