import db from './database.js'
import model from './model.js'
import express from 'express'
const app = express()


app.use(express.json())
app.post("/verificar-admin", ((req, res) => {
  const { email } = req.body
  model
    .find({
      email: email.toLowerCase()
    })
    .then(doc => {
      if (doc.length > 0) res.send(doc)
      else { res.send({ Message: "User not Found." }) }
    })
    .catch(err => {
      res.send(err)
    })

}))

app.post("/criar-admin", ((req, res) => {
  const { email } = req.body
  let msg = new model({
    email: email.toLowerCase()
  })

  model.find({
    email: email.toLowerCase()
  })
    .then((doc) => {
      console.log(doc.length)
      if (doc.length > 0) res.send(doc)
      else { msg.save().then(doc => res.send(doc)).catch(err => res.send(err)) }
    })
    .catch(err => {
      res.send(err)
    })
}))

app.delete("/delete-admin", ((req, res) => {
  const { email } = req.body

  model.find({
    email: email.toLowerCase()
  })
  .then((response) => {
    if (response.length <= 0) res.send({ Message: "User already removed." })
    else {model.findOneAndRemove({email: email.toLowerCase()}).then(response => res.send(response)).catch(err => res.send(err))}
  })
  .catch((err) => {
    res.send(err)
  })
}))
console.log(db)
app.listen({ port: 3000 }, () => { console.log("Running AT 3000 port") })