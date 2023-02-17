const fs = require('fs');

const Cart = require('./cart')

const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl,description,price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    
    
  }

  save() {
    getProductsFromFile(products => {
    if(this.id){
      const existingProductIndex=products.findIndex(prod=>prod.id===this.id)
      const updatedProducts=[...products]
      updatedProducts[existingProductIndex]=this;
      fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>console.log(err))
    }
    else{
      this.id=Math.random().toString()
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    }
    
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product=products.find(prod => prod.id === id)
      cb(product);
    })

  }
  static deleteById(id) {
      getProductsFromFile(products => {
        const product = products.find(prod => prod.id === id);
        if(!product){
          return
        }
        const updatedProducts = products.filter(prod => prod.id !== id);
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      });
    }
  // static deleteById(id){
  //   getProductsFromFile(products => {
  //     const index=products.findIndex(prod => prod.id===id)
  //     const updatedProducts=[];
  //     for(let i=0;i<products.length;i++){
  //       if(i===index){
  //         continue;
  //       }
  //       else{
  //         updatedProducts.push(products[i])
  //       }
  //       cb(products)
  //     }
  //     fs.writeFile(p,JSON.stringify(updatedproducts), err => {
  //       console.log(err);
  //     });

  //   })

  // }
};
