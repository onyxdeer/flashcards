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

  // query(recipeQuery).then(([recipe]) => {
  //   if(!recipe) return res.status(422).send({ error: 'Recipe does not exist' });
  // })

  return Promise.all([query(ingredientsQuery), query(tagsQuery), query(recipeQuery), query(userQuery)])
    // Get array that holds a results array for each query, which consists of objects
    .then(([ ingredients, tagList, [ recipe ], [ user ] ]) => {
    
    // Creates quantity and items array that holds all the quantities and items for each ingredient 
    const [ quantity, items ] = ingredients.reduce((acc, { quantity, ingredient }) => {
      return [ [...acc[0], quantity], [...acc[1], ingredient] ];
    }, [[], []])
    
    // Creates tags array for 
    const tags = tagList.reduce((arr, obj) => {
      return [...arr, obj.tag_name]
    },[])
    
    const { id, name, image, difficulty, cook_time, prep_time, servings, instructions, user_id, description, parent_id } = recipe;
    
    const { username } = user;
    
    // For given recipe
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

// array of different recipe objects
const getAllRecipesQuery = `SELECT * from recipes;`

query(getAllRecipesQuery)
  // Reformats above array into new array of recipe objects in elasticsearch object format
  .then(recipes => Promise.all(recipes.map(recipe => returnRecipe(recipe.id))))
  // Map through array above
  .then(details => {
    details.map((item, i) => {
      // Indexes each recipe object one by one
      $search.index({
        index: 'recipes',
        type: 'Object',
        id: i,
        // Holds all the properties of the array object
        body: item
      }, (error, response) => {});
    })
  })


// $search.indices.delete({
//   index: 'recipes'
// })