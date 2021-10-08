const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      Product
      // {
      //   model: Product,
      //   attributes: ['id', 'product_name']
      // }
    ]
})
.then(dbCategoriesData => {
  const categories = dbCategoriesData;
  console.log(dbCategoriesData)
  res.json(categories)
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
  const category = dbCategoryData;
  console.log(dbCategoryData)
  res.json(category)
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
    )
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbPCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
