const mongoose =require('mongoose')

mongoose.set('strictQuery',false)

const url =process.env.MONGODB_URI
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
    name:String,
    number:String
})

phonebookSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
    })
    module.exports =mongoose.model('Phonebook',phonebookSchema)