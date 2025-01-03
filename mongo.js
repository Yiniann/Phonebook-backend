const mongoose = require('mongoose')

const args= process.argv

if (args.length<3){
  console.log('please enter the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password =args[2]
const name = args[3] 
const number = args[4]

const url=`mongodb+srv://q767182288:${password}@cluster0.3m8l5.mongodb.net/phonkbook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Phonebook = mongoose.model('Phonebook',PhonebookSchema)

//如果只输入密码，返回所有的联系人
if (args.length===3){
  Phonebook.find({}).then(result=>{
    console.log('phonebook:')
    result.forEach(phonebook=>{
      console.log(phonebook.name,phonebook.number)
    })
    mongoose.connection.close()
  })
}

else if (args.length===5){
  const phonebook = new Phonebook({
    name:name,
    number:number
  })

phonebook.save().then(result=>{
  console.log('phonebook saved!')
  mongoose.connection.close()
})}

else{
  console.log('please enter the password as an argument: node mongo.js <password>')
  process.exit(1)
}