const {Schema,model} = require('mongoose')
let cartSchema = new Schema({
  image:String,
  detail:{type:String,required:true,},
  save:String,
  review:String,
  actualPrice:String,
  price:{type:String,required:true},
})

let Cart = model('cart',cartSchema)

module.exports =  cart