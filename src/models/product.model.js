const {Schema,model} = require('mongoose')
let productSchema = new Schema({
  image:String,
  detail:{type:String,required:true,},
  save:String,
  review:String,
  actualPrice:String,
  price:{type:String,required:true},
})

let Product = model('Product',productSchema)

module.exports =  Product