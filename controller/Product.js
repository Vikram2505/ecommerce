const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save((err, res) => {
    console.log({ err, res });
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(res);
    }
  });
};
