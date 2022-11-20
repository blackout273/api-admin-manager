import db from "./database.js";
import model from "./model.js";
import express from "express";
import axios from 'axios'
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.post("/verificar-admin", (req, res) => {
  const { email } = req.body;
  model
    .find({
      email: email.toLowerCase(),
    })
    .then((doc) => {
      if (doc.length > 0) res.send(doc);
      else {
        res.send({ Message: "User not Found." });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/criar-admin", (req, res) => {
  const { email } = req.body;
  const { senha } = req.body;

  model
    .find({
      email: email.toLowerCase(),
    })
    .then(async (doc) => {
      if (doc.length > 0) res.send({id:doc[0].id});
      else {
        const response = await axios.post("https://api-encrypt-three.vercel.app", {userPassword:senha},{headers:"Content-Type:application/json"})

        let msg = new model({
          email: email.toLowerCase(),
          senha: response.data
        });

        msg
          .save()
          .then((doc) => res.send({id:doc.id}))
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/login-admin", (req, res) => {
  const { email } = req.body;
  model
    .find({
      email: email.toLowerCase(),
    })
    .then((doc) => {
      if (doc.length > 0) res.send({senha:doc[0].senha});
      else res.send({ Message: "User not found." });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/delete-admin", (req, res) => {
  const { email } = req.body;

  model
    .find({
      email: email.toLowerCase(),
    })
    .then((response) => {
      if (response.length <= 0) res.send({ Message: "User already removed." });
      else {
        model
          .findOneAndRemove({ email: email.toLowerCase() })
          .then((response) => res.send(response))
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/", (req, res) => {
  res.send("Bem vindo a API ADMIN MANAGER!");
});

console.log(db);
app.listen(port, () => {
  console.log(`Running AT ${port} port`);
});
