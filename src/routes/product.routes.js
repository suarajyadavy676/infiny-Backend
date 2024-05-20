const {Router} = require('express')
const Product = require('../models/product.model')

let productRouter = Router()

productRouter.post('/',async(req,res)=>{
  console.log(req.body)
  try {
    await Product.create(req.body)
    return res.json({mes:"data created successFully"})
  } catch (error) {
    console.log("error in server")
    return res.status(500).send("server side error")
  }
})
 productRouter.get('/',async(req,res)=>{
  try {
    let data = await Product.find()
    console.log(data)
    return res.send(data)
  } catch (error) {
    return res.status.send("server side error")
  }
 })
module.exports = productRouter