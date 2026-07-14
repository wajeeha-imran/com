import express from "express";
import { AppDataSource } from "../config/datasource.js";

import Order from "../entities/Order.js";
import OrderItem from "../entities/OrderItem.js";
import Product from "../entities/Product.js";
import User from "../entities/User.js";

import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";


const router = express.Router();


const orderRepo = AppDataSource.getRepository(Order);

const orderItemRepo = AppDataSource.getRepository(OrderItem);

const productRepo = AppDataSource.getRepository(Product);

const userRepo = AppDataSource.getRepository(User);
router.post("/", authMiddleware, async (req, res) => {

    const queryRunner = AppDataSource.createQueryRunner();


    await queryRunner.connect();

    await queryRunner.startTransaction();


    try {


        const {
            items,
            shippingAddress
        } = req.body;



        if (!items || items.length === 0) {

            return res.status(400).json({

                message: "Cart is empty."

            });

        }



        const user = await userRepo.findOne({

            where: {

                id: req.userId

            }

        });



        if (!user) {

            return res.status(404).json({

                message:"User not found."

            });

        }



        let total = 0;



        
            const order = orderRepo.create({

    user,

    userId: user.id,

    customerName: user.name,

    phone: user.phone || "",

    shippingAddress,

    products: items,

    totalAmount: 0,

    status: "Pending"

});



        await queryRunner.manager.save(
            Order,
            order
        );



        for (const item of items) {


            let product = await productRepo.findOne({

                where:{

                    id:item.productId

                }

            });



            /*
            ===========================
            Dummy Product
            ===========================
            */


            if (!product) {


                product = {

                    id:item.productId,

                    name:item.name,

                    price:item.price,

                    stock:999,

                    description:
                    item.description || "Dummy Product"

                };


            }



            if(product.stock < item.quantity){


                throw new Error(
                    `${product.name} is out of stock.`
                );


            }



            /*
            ===========================
            Update stock only for DB products
            ===========================
            */


            const databaseProduct =
            await productRepo.findOne({

                where:{

                    id:item.productId

                }

            });



            if(databaseProduct){


                databaseProduct.stock -= item.quantity;


                await queryRunner.manager.save(

                    Product,

                    databaseProduct

                );


            }



            total += 
            Number(product.price) *
            item.quantity;



        }




        order.total = total;



        await queryRunner.manager.save(

            Order,

            order

        );



        await queryRunner.commitTransaction();



        const createdOrder =
        await orderRepo.findOne({

            where:{

                id:order.id

            }

        });



        return res.status(201).json({

            success:true,

            message:"Order placed successfully.",

            order:createdOrder

        });



    }
    catch(error){


        await queryRunner.rollbackTransaction();


        console.log(error);



        return res.status(500).json({

            success:false,

            message:error.message

        });


    }



    finally{


        await queryRunner.release();


    }


});
/*
========================================
MY ORDERS
========================================
*/

router.get("/my-orders", authMiddleware, async (req, res) => {

    try {


        const orders = await orderRepo.find({

            where: {

                user: {

                    id: req.userId

                }

            },

            order: {

                createdAt: "DESC"

            }

        });



        res.json(orders);


    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});



/*
========================================
ADMIN
ALL ORDERS
========================================
*/


router.get("/", authMiddleware, adminMiddleware, async (req,res)=>{


    try{


        const orders = await orderRepo.find({

            order:{

                createdAt:"DESC"

            }

        });



        res.json(orders);



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});



/*
========================================
SINGLE ORDER
========================================
*/


router.get("/:id", authMiddleware, async(req,res)=>{


    try{


        const order = await orderRepo.findOne({

            where:{

                id:Number(req.params.id)

            }

        });



        if(!order){

            return res.status(404).json({

                message:"Order not found."

            });

        }



        res.json(order);



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});



/*
========================================
UPDATE STATUS
========================================
*/


router.put(
"/:id/status",
authMiddleware,
adminMiddleware,
async(req,res)=>{


    try{


        const order = await orderRepo.findOne({

            where:{

                id:Number(req.params.id)

            }

        });



        if(!order){


            return res.status(404).json({

                message:"Order not found."

            });


        }



        order.status = req.body.status;



        await orderRepo.save(order);



        res.json({

            success:true,

            message:"Order status updated.",

            order

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});



/*
========================================
DELETE ORDER
========================================
*/


router.delete(
"/:id",
authMiddleware,
adminMiddleware,
async(req,res)=>{


    try{


        const order = await orderRepo.findOne({

            where:{

                id:Number(req.params.id)

            }

        });



        if(!order){


            return res.status(404).json({

                message:"Order not found."

            });


        }



        await orderRepo.remove(order);



        res.json({

            success:true,

            message:"Order deleted."

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});



export default router;