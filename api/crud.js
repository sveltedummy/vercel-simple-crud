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
    people = people.filter((_, i) => i !== index);
    res.status(200).json(people)
  }
};
