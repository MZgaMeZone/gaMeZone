// const orderModel = require("../db/models/order-models");
import { orderModel } from "../db/index.js";

class OrderService {
  constructor() {
    this.orderModel = orderModel;
  }
  // 유저 아이디(이메일)로 해당 유저의 주문내역을 확인하는 기능
  async findUserOrder(userId) {
    const order = await orderModel.findById(userId);
    return order;
  }
  // 모든 주문내역을 확인하는 기능
  async findAllOrdersByAdmin() {
    let result = [];
    const orders = await orderModel.findAllOrders();
    for (let i = 0; i < Object.values(orders).length; i++) {
      result.push(orders[i]);
    }
    return result;
  }
  async findOrderIndex(orderIndex) {
    const order = await orderModel.findByOrderIndex(orderIndex);

    return order;
  }

  // 새로운 주문을 생성하는 기능
  async createNewOrder(orderInfo) {
    const newOrders = await orderModel.createOrder(orderInfo);
    return newOrders;
  }
  // 유저가 주문번호로 검색하여 주문정보를 변경하는 기능
  async changeUsersOrder(orderIndex, updateInfo) {
    const changeOrders = await orderModel.changeOrder(orderIndex, updateInfo);
    return changeOrders;
  }
  // 관리자가 주문번호로 검색하여 특정 유저의 주문을 삭제하는 기능
  async deleteOrderByAdmin(orderIndex) {
    const deleteOrder = await orderModel.deleteAll(orderIndex);
    return deleteOrder;
  }
  // 유저가 주문번호로 검색하여 배송 시작 전의 자신의 주문을 취소하는 기능
  async deleteOrderByUser(orderIndex) {
    const cancelOrder = await orderModel.cancelOrder(orderIndex);
    return cancelOrder;
  }
  // 관리자가 주문번호로 검색하여 해당 주문의 배송 상태를 변경하는 기능
  async changeStatusByAdmin(orderIndex, status) {
    const changeShippingStatus = await orderModel.changeStatus(
      orderIndex,
      status
    );
    return changeShippingStatus;
  }
  // 관리자가 주문번호로 검색하여 해당 주문의 운송장번호를 변경하는 기능
  async changeWayBillByAdmin(orderIndex, waybill) {
    const changeWayBill = await orderModel.changeWayBill(orderIndex, waybill);
    return changeWayBill;
  }
}
const orderService = new OrderService(orderModel);

// module.exports = { orderService };
export { orderService };
