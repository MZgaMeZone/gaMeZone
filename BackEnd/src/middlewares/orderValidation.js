import { OrderJoiSchema } from "../validators/index.js";

class OrderJoi {
  async newOrderJoi(req, res, next) {
    const body = req.body;
    try {
      await OrderJoiSchema.newOrder.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }

    next();
  }
  async changeOrderJoi(req, res, next) {
    const body = req.body;
    try {
      await OrderJoiSchema.changeOrder.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }
  async changeWayBillJoi(req, res, next) {
    const body = req.body;
    try {
      await OrderJoiSchema.changeWayBill.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }
  async changeStatusJoi(req, res, next) {
    const body = req.body;
    try {
      await OrderJoiSchema.changeShippingStatus.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }
}

const orderChecker = new OrderJoi();
export { orderChecker };
