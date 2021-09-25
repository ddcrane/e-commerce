const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
})
.then(dbCategoriesData => {
  const categories = dbCategoriesData.map(post => post.get({ plain: true }));
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
   include: [
     {
       model: Product,
       attributes: ['id', 'product_name']
     }
   ]
 })
 .then(dbCategoryData => {
   const category = dbCategoryData.map(post => post.get({ plain: true }));
 })
 .catch(err => {
   console.log(err);
   res.status(500).json(err);
 });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
     
      res.status(200).json(category);
    })
    .then((dbCategoryData => res.status(200).json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
}))
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
