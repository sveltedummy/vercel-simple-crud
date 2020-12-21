# Vercel Simple Serverless CRUD API
   
**Sign up for Vercel, then you can set up and deploy a site with..**   
`$ npm intall -g vercel`   
`$ vercel init svelte name_of_project` (might be prompted to connect account)   
`$ cd name_of_project`   
`$ npm i`   
`$ vercel`   
`(hit enter, enter, enter, enter)`   
for override settings type..   
`y, enter, down, down, space, enter, npm run dev`   
   
**Do this to the Code**   
rename api/date.js to crud.js
paste this in crud.js

```let people = [{name: 'Patrick'}, {name: 'Sandy'}, {name: 'Bob'}]
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
```
   
**Try it out**   
`$ vercel dev`    
then try it at `localhost:3000/api/crud`   
or    
`$ vercel`   
then try it out at `{the_link_it_gives_you}/api/crud`   
