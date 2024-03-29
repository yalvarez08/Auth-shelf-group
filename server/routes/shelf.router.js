const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/',rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  console.log('/shelf GET route. Is user authenticated?:', req.isAuthenticated());
  let queryText = `SELECT * FROM "item";`;
  pool
    .query(queryText) 
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error getting items on shelf:', error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user, 'Is user authenticated?:', req.isAuthenticated());
  
  const description = req.body.description;
  console.log('input item description:', description)
  const image = req.body.image_url;
  const queryText = `INSERT INTO "item" (description, image_url)
    VALUES ($1, $2);`;
    pool
    .query(queryText, [description, image])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Adding item to shelf failed: ', err);
      res.sendStatus(500);
    }); // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // if (req.params.user_id === req.user.id){
  
console.log('we are here');
  const queryText = `DELETE FROM "item" 
                    WHERE id = $1;`;
  console.log('req.params.id', req.params.id)
  pool
  .query(queryText, [req.params.id])
    .then(result => {res.sendStatus(201)
    }).catch((err) => {
      console.log('Deleting item from shelf failed: ', err);
      res.sendStatus(500);
    }); 
  // } else { res.sendStatus(401) }
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
