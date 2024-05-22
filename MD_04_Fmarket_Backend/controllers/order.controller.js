const orderModel = require("../models/Orders");
const optionModel = require("../models/Option");
const productModel = require("../models/Products");

const calculateTotalPrice = async (productsOrder) => {
  let totalPrice = 0;

  for (const product of productsOrder) {
    const option = await optionModel.option.findById(product.option_id);

    if (option) {
      totalPrice += option.price * product.quantity;
    }
  }

  return totalPrice;
};

const createOrder = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { productsOrder, info_id } = req.body;

    const total_price = await calculateTotalPrice(productsOrder);
    // Sử dụng đối tượng để theo dõi store_id và productsOrder tương ứng
    const newOrder = new orderModel.order({
      user_id,
      productsOrder,
      total_price,
      info_id,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      code: 201,
      result: savedOrder,
      message: "created order successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const queryCondition = { user_id: userId };
    if (status) {
      queryCondition.status = status;
    }

    const orders = await orderModel.order
      .find(queryCondition)
      .sort({ updatedAt: -1 })
      .populate(["user_id", "info_id"]);

    const result = await Promise.all(
      orders.map(async (order) => {
        const productsOrder = await Promise.all(
          order.productsOrder.map(async (productOrder) => {
            const option = await optionModel.option
              .findById(productOrder.option_id)
              .lean()
              .populate("product_id");

            return {
              option_id: option,
              quantity: productOrder.quantity,
            };
          })
        );

        return {
          _id: order._id,
          user_id: order.user_id,
          info_id: order.info_id,
          productsOrder,
          total_price: order.total_price,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      })
    );

    return res.status(200).json({
      code: 200,
      result: result,
      message: "created order successfully",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.order.findById(orderId);

    if (!order) {
      return res.status(404).json({ code: 404, message: "order not found" });
    }

    if (order.status == "Đã hủy") {
      return res
        .status(409)
        .json({ code: 409, message: "Don't change status order" });
    }

    const updatedOrder = await orderModel.order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    // Check if the order status is updated successfully
    if (!updatedOrder) {
      return res.status(404).json({ code: 404, message: "Order not found" });
    }

    // If the order status is updated to 'Đã giao hàng', update quantity and soldQuantity
    if (status === "Đã giao hàng") {
      // Loop through productsOrder array in the order
      for (const product of updatedOrder.productsOrder) {
        const { option_id, quantity } = product;

        // Find and update the option by ID
        await optionModel.option.findByIdAndUpdate(
          option_id,
          {
            $inc: { quantity: -quantity, soldQuantity: quantity },
          },
          { new: true }
        );
      }
    }

    return res
      .status(200)
      .json({ code: 200, message: "Update status order successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const detailOrders = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const orderDetail = await orderModel.order
      .findById(orderId)
      .populate("user_id", "email username full_name role_id is_active")
      .populate({
        path: "productsOrder",
        populate: {
          path: "option_id",
          model: "option",
          populate: {
            path: "product_id",
            model: "product",
          },
        },
      })
      .populate("info_id");

    // Kiểm tra xem order có tồn tại không
    if (!orderDetail) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({
      code: 200,
      result: orderDetail,
      message: "created order successfully",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// const ordersForStore = async (req, res, next) => {
//   try {
//     const store_id = req.store._id;
//     const { status } = req.query;

//     // Tìm tất cả các sản phẩm thuộc cửa hàng
//     const productsInStore = await productModel.product.find({ store_id });

//     // Lấy danh sách id của các sản phẩm thuộc cửa hàng
//     const productIds = productsInStore.map((product) => product._id);

//     // Tìm tất cả các option thuộc các sản phẩm của cửa hàng
//     const optionsInStore = await optionModel.option.find({
//       product_id: { $in: productIds },
//     });

//     // Lấy danh sách id của các option thuộc cửa hàng
//     const optionIds = optionsInStore.map((option) => option._id);

//     // Tìm tất cả các đơn đặt hàng chứa các option thuộc cửa hàng
//     const foundOrders = await orderModel.order
//       .find({
//         "productsOrder.option_id": { $in: optionIds },
//         status: status || { $exists: true }, // Lọc theo trạng thái nếu được chỉ định
//       })
//       .populate({
//         path: "productsOrder",
//         populate: {
//           path: "option_id",
//           model: "option",
//           populate: {
//             path: "product_id",
//             model: "product",
//           },
//         },
//       })
//       .populate("info_id")
//       .populate("user_id")
//       .exec();

//     return res.status(200).json({
//       code: 200,
//       result: foundOrders,
//       message: "Retrieved orders successfully for the store",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ code: 500, message: error.message });
//   }
// };

// const collectOrders = async (req, res, next) => {
//   try {
//     const storeId = req.store._id;

//     // Find orders with the "Đã giao hàng" status and the specified storeId
//     const orders = await orderModel.order
//       .find({ status: "Đã giao hàng" })
//       .populate({
//         path: "productsOrder",
//         populate: {
//           path: "option_id",
//           model: "option",
//           populate: {
//             path: "product_id",
//             model: "product",
//             match: { store_id: storeId },
//             select: "name",
//           },
//         },
//       })
//       .populate("user_id")
//       .exec();
//     console.log(orders);
//     res.status(200).json({
//       code: 200,
//       result: orders,
//       message: "get collect order success!",
//     });
//   } catch (error) {
//     console.error("Error in catch block:", error);
//     return res.status(500).json({ code: 500, message: error.message });
//   }
// };

const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.order.findById(orderId);

    if (!order) {
      return res.status(404).json({ code: 404, message: "order not found" });
    }

    if (order.status != "Chờ xác nhận") {
      return res.status(409).json({ code: 409, message: "Don't cancel order" });
    }

    await orderModel.order.findByIdAndUpdate(
      orderId,
      { status: "Đã hủy" },
      { new: true }
    );

    return res
      .status(200)
      .json({ code: 200, message: "update stutus order successfully" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { status } = req.query;
    if (!user.role_id == "admin" || !user.role_id == "staff") {
      return res.status(403).json({
        code: 403,
        message: "You do not have permission to use this function",
      });
    }
    const order = await orderModel.order
      .find(status ? { status } : null)
      .populate("user_id", "email username full_name is_active")
      .populate({
        path: "productsOrder",
        populate: {
          path: "option_id",
          model: "option",
          populate: {
            path: "product_id",
            model: "product",
            select: "name",
          },
        },
      })
      .populate("info_id")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      code: 200,
      result: order,
      message: "get order successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  updateOrderStatus,
  detailOrders,
  // ordersForStore,
  // collectOrders,
  cancelOrder,
  getAllOrder,
};
