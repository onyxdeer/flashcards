const $search = require('./elasticSearch');
const _ = require('lodash');
// const Promise = require('bluebird');
// const db = require('../db/db')
// const query = Promise.promisify(db.query.bind(db));

function returnRecipe(id) {
  const ingredientsQuery = `SELECT * from ingredients WHERE recipe_id = ${id};`;
  const tagsQuery = `SELECT * from tags WHERE recipe_id = ${id};`;
  const recipeQuery = `SELECT * from recipes WHERE id = ${id};`
  const userQuery = `SELECT username FROM users WHERE id = (SELECT user_id FROM recipes WHERE id = ${id})`

  query(recipeQuery).then(([recipe]) => {
    if(!recipe) return res.status(422).send({ error: 'Recipe does not exist' });
  })

  return Promise.all([query(ingredientsQuery), query(tagsQuery), query(recipeQuery), query(userQuery)])
    .then(([ ingredients, tagList, [ recipe ], [ user ] ]) => {
    const [ quantity, items ] = ingredients.reduce((acc, { quantity, ingredient }) => {
      return [ [...acc[0], quantity], [...acc[1], ingredient] ];
    }, [[], []])
    const tags = tagList.reduce((arr, obj) => {
      return [...arr, obj.tag_name]
    },[])
    const { id, name, image, difficulty, cook_time, prep_time, servings, instructions, user_id, description, parent_id } = recipe;
    const { username } = user;
    return {
      id,
      parent_id,
      image,
      username, 
      name, 
      difficulty, 
      description,
      cook_time, 
      prep_time, 
      servings, 
      instructions, 
      ingredients: { quantity, items },
      user_id,
      tags
    }
  })
}
const getAllRecipesQuery = `SELECT * from recipes;`

query(getAllRecipesQuery)
  .then(recipes => Promise.all(recipes.map(recipe => returnRecipe(recipe.id))))
  .then(details => {
    details.map((item, i) => {
      $search.index({
        index: 'recipes',
        type: 'Object',
        id: i,
        body: item
      }, (error, response) => {});
    })
  })


// $search.indices.delete({
//   index: 'recipes'
// })