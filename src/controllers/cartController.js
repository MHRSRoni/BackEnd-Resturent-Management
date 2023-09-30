const cartModel = require('../models/cartModel')

// add a new cartList
exports.addCartListController = async (req, res) =>{
    try {

        let customerId = req.headers.id;
        let { foodId, qty} = req.params;

        let result = await cartModel.updateOne(
            { customerId },
            {
                $set: { customerId },
                $addToSet: {
                    cart: { foodId, qty }
                }
            },
            { upsert: true}
        )

        console.log(result)
      

        return res.status(200).json({
            status: "success",
            message: "Item added to Cartlist"
        })

    } catch (error) {
        return res.status(200).json({
            status: "fail",
            message: "Something went wrong"
        })
    }
}


// Get All CartList by id
exports.getAllCartListById = async (req, res) => {
    try {
        
        let customerId = req.headers.id;
        
        let data = await cartModel.find({ customerId })

        return res.status(200).json({
            status: 'success',
            message: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Something went wrong"
        })
    }
}


// Update the quantity in the Cartlist
exports.updateCartListController = async (req, res) =>{
    try {

        let customerId = req.headers.id;
        let { foodId, qty} = req.params;

        let result = await cartModel.updateOne(
            { customerId, "cart.foodId": foodId },
            {
                $set: { "cart.$.qty": qty }
            }
        );
      
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: "success",
                message: "Item updated in the Cartlist"
            });
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the cartlist"
            });
        }

    } catch (error) {
        return res.status(200).json({
            status: "fail",
            message: "Something went wrong"
        })
    }
}


// Delete the cart  from the cartlist
exports.removeCartById = async (req, res) =>{
    try {

        let customerId = req.headers.id;
        let foodId = req.params.foodId;

        let result= await cartModel.updateOne(
            { customerId },
            {
                $pull: { cart: { foodId } }
            }
        );

        console.log(result)

      
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: "success",
                message: "Item removed from the Cartlist"
            });
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the Cartlist"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Something went wrong"
        })
    }
}