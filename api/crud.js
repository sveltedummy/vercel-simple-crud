let people = [{name: 'Patrick'}, {name: 'Sandy'}, {name: 'Bob'}]

module.exports = function (req, res) {
    if (req.method === 'GET') {
      res.status(200).json(people);
    } else if (req.method === 'POST') {
      people.push(req.body)
      res.status(200).json(people)
    } else if (req.method === 'PUT') {
      const {person, index} = req.body;
      people[index] = person;
      res.status(200).json(people)
    } else if (req.method === 'DELETE') {
      const {index} = req.body;
      people = people.filter(function(_, i) { return i !== index });
      res.status(200).json(people)
    }
  };

/* To integrate with MongoDB..
 1. On MongoDB site, Create..
 - Account
 - Cluster
 - Database Access User
 - Network Access
2. Copy URI from MongoDB site and then..
  - Add as Env variable
3. Setup API!
  - npm install mongoose
  - create schema
  - connect to database with URI
  - write CRUD functions
*/ 