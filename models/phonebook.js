const mongoose =require('mongoose')

const phonebookSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true
  },
  number:{
    type:String,
    required:true,
    validate:{
      validator: (v) => /^\d{2,3}-\d+$/.test(v) && v.length >= 8,
      message:props => `${props.value} is not a valid phone number`
    }
  }
})

phonebookSchema.set('toJSON',{
  transform:(document,returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports =mongoose.model('Phonebook',phonebookSchema)