

const Cart = require('./cart')

const db= require('../util/database')




module.exports = class Product {
  constructor(id,title, imageUrl,description,price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    
    
  }

  save() {
    return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?) ',
    [this.title,this.price,this.description,this.imageUrl])
  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products')
  }

  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id=?', [id])
  }
  static deleteById(id) {
      return db.execute('DELETE FROM products WHERE products.id=?',[id])
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
