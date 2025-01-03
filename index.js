const express = require('express')
const app = express()
require('dotenv').config()
const Phonebook = require('./models/phonebook')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//获取所有联系人
app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons=>{
    response.json(persons)
    .catch(error=>next(error))
  })
})
//信息
app.get('/info',(request,response)=>{
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})
//获取单个联系人
app.get('/api/persons/:id',(request,response)=>{
  Phonebook.findById(request.params.id).then(person=>{
    response.json(person)
  })
  .catch(error=>next(error))
})
//删除联系人
app.delete('/api/persons/:id',(request,response)=>{
    Phonebook.findByIdAndDelete(request.params.id).then(()=>{
      response.status(204).end()
    })
    .catch(error=>next(error))
})
//增加联系人
app.post('/api/persons',(request,response)=>{
    const body = request.body
    if (!body.name){
        return response.status(400).json({
            error:'name missing'
        })
    }
    if (!body.number){
        return response.status(400).json({
            error:'number missing'
        })
    }
    const existperson = persons.find(person=>person.name === body.name)
    if (existperson){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    const person = new Phonebook({
      name: body.name,
      number: body.number
    })
    person.save().then(savePersons=>{
      response.json(savePersons)
    })
    .catch(error=>next(error))
})
//修改联系人
app.put('/api/persons/:id',(request,response)=>{
  const body = request.body
  const person ={
    name:body.name,
    number:body.number}
    Phonebook.findByIdAndUpdate(request.params.id,person,{new:true}).then(updatePerson=>{
      response.json(updatePerson)
    })
    .catch(error=>next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})