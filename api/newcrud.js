const mongoose = require('mongoose');

const uri = process.env.DB_URI

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const Person = mongoose.model(
    'Person',
    personSchema,
    'People'
)

mongoose.connect(
    uri, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, 
    function(error) { if (error) console.log("Error!" + error); }
); 

module.exports = function (req, res) {
  if (req.method === 'GET') {
    Person.find()
        .then(people => {
            res.status(200).json(people);
        })
        .catch((error) => res.status(500).json(error.message))
  } else if (req.method === 'POST') {
    const newPerson = new Person(req.body);
    newPerson.save()
        .then(newPerson => {
            res.status(200).json(newPerson)
        })
        .catch((error) => res.status(500).json(error.message))
  } else if (req.method === 'PUT') {
    const {person, _id} = req.body;
    Person.findByIdAndUpdate(_id, person, {returnOriginal: false})
        .then(updatedPerson => {
            res.status(200).json(updatedPerson)
        })
        .catch((error) => res.status(500).json(error.message))
  } else if (req.method === 'DELETE') {
    const {_id} = req.body;
    Person.findByIdAndDelete(_id)
        .then(deletedPerson => {
            res.status(200).json(deletedPerson)
        }).catch((error) => res.status(500).json(error.message))
    }
};
