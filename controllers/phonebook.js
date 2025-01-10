const phonebookRouter = require('express').Router()
const Phonebook = require('../models/phonebook')


//获取电话本信息
phonebookRouter.get('/info',(request,response,next) => {
  const date = new Date()
  Phonebook.countDocuments({})
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
    .catch(error => next(error))
})

//获取所有联系人
phonebookRouter.get('/', (request, response,next) => {
  Phonebook.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

//获取单个联系人
phonebookRouter.get('/:id',(request,response,next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


//删除联系人
phonebookRouter.delete('/:id',(request,response,next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//增加联系人
phonebookRouter.post('/',(request,response,next) => {
  const body = request.body

  if (!body.name){
    return response.status(400).json({ error:'name missing' })
  }
  if (!body.number){return response.status(400).json({ error:'number missing'
  })}

  //检查唯一性名字的
  Phonebook.findOne({ name:body.name })
    .then(exitingperson => {
      if(exitingperson){
        return response.status(400).json({ error:'name must be unique' })
      }
      const person = new Phonebook({
        name: body.name,
        number: body.number
      })

      //保存到数据库
      return person
        .save()
        .then(savePersons => {
          response.json(savePersons)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

//修改联系人
phonebookRouter.put('/:id',(request,response,next) => {
  const { name,number } = request.body
  if (!name || !number){
    return response.status(400).json({ error:'name or number missing' })
  }
  Phonebook.findByIdAndUpdate(request.params.id,
    { name,number },
    { new:true,runValidators:true,context:'query' })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

module.exports = phonebookRouter