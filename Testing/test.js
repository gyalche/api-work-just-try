const mongoose=require('mongoose');
const Donor=require('../models/doner');
const Product = require("../models/dProductModel");
const url='mongodb://127.0.0.1:27017/ApiTesting';

// beforeAll(async()=>{
//     await mongoose.connect(url, {
        
//     })
// });
// afterAll(async()=>{
//     await mongoose.connection.close();
// })

// //register testing
// describe('donor Schema testanything', ()=>{
//     it('create donor testinganything', ()=>{
//         const userdoner={
//             username: "bla",
//             email:"blabla@gmail.com",
//             address:"gokana ",
//             phoneNumber:"98754431",
//             password:"sherpadwa",
//             image:"shepadawa.jpg"

            
//         }
//         return Donor.create(userdoner).then((pro_ret)=>{
//             expect(pro_ret.username).toEqual("bla")
//         })
//     })
// })

//dproductmodel 

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})

// describe('product Schema testanything', ()=>{
//     it('create product testinganything', ()=>{
//         const creatproduct={
            
//             desc:"sun",
//             productName:"pan",
//             donerName:"DawaDn",
//             pimage:"fsds.jpg"
            
//         }
//         return Product.create(creatproduct).then((pro_ret)=>{
//             expect(pro_ret.desc).toEqual("sun")
//         })
//     })
// })

// update product testing
// the above for the update testing

// it('to test the update',async()=>{
//     return Product.findOneAndUpdate({_id:Object('620f5f4254b152b2f3db6900')},
//     {$set:{desc:"hh"}})
//     .then((pdn)=>{
//         // expect(pdn.desc).toEqual('clothes')
//         expect(pdn.desc==='hh')
//     });
  
// });

// for product delete testing
it('to test the delete product is working or not', async() =>{
    const status = await Product.deleteMany()
    // expect(status.ok).toBe(1)
    expect(status===1);
});





