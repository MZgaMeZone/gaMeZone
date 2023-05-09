import mongoose from "mongoose";
import OrderSchema from "../schemas/order-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함
// import { Product } from "../schemas/product-schema.js";

const Order = mongoose.model("orders", OrderSchema);

class OrderModel {
  // 주문자 id(email)로 해당 유저의 주문내역을 검색하는 기능
  async findById(userId) {
    const findOrder = await Order.find({ buyerEmail: userId });
    if (findOrder.length < 1) {
      console.log(
        `[주문내역 검색 실패] 해당 ID(${userId})의 주문내역이 존재하지 않습니다.`
      );
    }
    return findOrder;
  }

  // 주문번호로 주문내역을 상세 검색하는 기능
  // async findByOrderIndex(orderIndex) {
  //   const findOrderByIndex = await Order.findOne({ orderIndex: orderIndex });
  //   if (!findOrderByIndex || findOrderByIndex.length < 1) {
  //     console.log("[주문번호 검색 실패] 해당 주문번호를 찾을 수 없습니다.");
  //   }
  //   //--------------------상세 상품 정보를 가져오는 부분-----------------------//
  //   let result = [];
  //   const orderListToPopulate = findOrderByIndex.orderList;
  //   const orderAmount = orderListToPopulate.length;
  //   for (let i = 0; i < orderAmount; i++) {
  //     let content = { product: "", amount: 0 };
  //     let productId = orderListToPopulate[i].product;
  //     content.amount = orderListToPopulate[i].amount;
  //     const findProductById = await Product.findOne({
  //       _id: productId,
  //     }).select("name type country brand price discountPrice imgUrl");
  //     content.product = findProductById;
  //     result.push(content);
  //   }
  //   findOrderByIndex.orderList = result;
  //   //----------------------------------------------------------------------//
  //   return findOrderByIndex;
  // }
  // [Admin] 모든 유저의 주문내역을 조회하는 기능
  async findAllOrders() {
    const allOrder = await Order.find({});
    if (!allOrder || allOrder.length < 1) {
      console.log("[주문 전체조회 실패] 주문내역이 하나도 존재하지 않습니다.");
    }
    return allOrder;
  }
  // 유저가 새 주문을 생성하는 기능.
  async createOrder(orderInfo) {
    try {
      const newOrder = await Order.create(orderInfo);
      //----------------고유한 주문번호를 생성하는 부분---------------//
      newOrder.orderIndex = dayjs().format("YYYYMMDD") + nanoid(6);
      //---------생성한 주문번호를 저장---------//
      const newOrderList = await newOrder.save();
      return newOrderList;
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }

  // 유저가 기존 주문관련 정보를 수정하는 기능
  async changeOrder(orderIndex, updateInfo) {
    try {
      const searchingOrder = await Order.findOne({ orderIndex: orderIndex });

      if (!searchingOrder) {
        throw new Error(
          "[주문정보 수정 실패] 주문 정보가 없습니다. 주문을 먼저 진행해 주세요."
        );
      }

      if (searchingOrder.shippingStatus === "배송중") {
        throw new Error(
          "[주문정보 수정 실패] 이미 배송이 시작되어 주문 수정이 불가능합니다."
        );
      }
      //-----변경가능 항목 : 수령인, 수령인연락처, 배송주소, 상세주소, 배송요청사항-----//
      if (updateInfo.shippingExtraAddress) {
        searchingOrder.shippingAddress = updateInfo.shippingAddress;
      }
      if (updateInfo.shippingExtraAddress) {
        searchingOrder.shippingExtraAddress = updateInfo.shippingExtraAddress;
      }
      if (updateInfo.shippingRequest) {
        searchingOrder.shippingRequest = updateInfo.shippingRequest;
      }
      if (updateInfo.recipientName) {
        searchingOrder.recipientName = updateInfo.recipientName;
      }
      if (updateInfo.recipientPhoneNumber) {
        searchingOrder.recipientPhoneNumber = updateInfo.recipientPhoneNumber;
      }
      const updatedOrderData = await searchingOrder.save();
      return updatedOrderData;
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }

  // [Admin] 관리자가 주문번호로 기존 주문내역을 삭제하는 기능
  async deleteAll(orderIndex) {
    try {
      const orderToCancel = await Order.findOne({ orderIndex: orderIndex });
      if (!orderToCancel) {
        throw new Error(
          "[주문내역 삭제 실패] 주문 정보가 없습니다. 주문번호를 다시 확인해 주세요."
        );
      }
      await Order.deleteOne({ orderIndex: orderIndex });
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }

  // 유저가 주문번호로 자신의 주문을 취소하는 기능
  async cancelOrder(orderIndex) {
    try {
      const orderToCancel = await Order.findOne({ orderIndex: orderIndex });
      if (!orderToCancel) {
        throw new Error(
          "[주문 취소 실패] 주문 정보가 없습니다. 주문번호를 다시 확인해 주세요."
        );
      }
      // 유저 인터페이스에서는, 배송중인 상품의 취소가 불가능하다.
      if (orderToCancel.shippingStatus === "배송중") {
        throw new Error(
          "[주문 취소 실패] 배송이 시작되어 주문취소가 불가능합니다."
        );
      }
      await Order.deleteOne({ orderIndex: orderIndex });
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }

  // [Admin] 관리자가 주문번호로 기존 주문내역의 배송상태를 변경하는 기능
  async changeStatus(orderIndex, status) {
    try {
      const orderToChangeStatus = await Order.findOne({
        orderIndex: orderIndex,
      });
      if (!orderToChangeStatus) {
        throw new Error("[배송상태 변경 실패] 해당 주문정보가 없습니다.");
      }
      orderToChangeStatus.shippingStatus = status;
      const updatedStatus = await orderToChangeStatus.save();
      return updatedStatus;
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }

  // [Admin] 관리자가 주문번호로 기존 주문내역의 운송장번호를 변경하는 기능
  async changeWayBill(orderIndex, number) {
    try {
      const toChangeWayBill = await Order.findOne({
        orderIndex: orderIndex,
      });
      if (!toChangeWayBill) {
        throw new Error("[운송장번호 변경 실패] 주문 정보를 찾을 수 없습니다.");
      }
      if (toChangeWayBill.shippingStatus !== "배송중") {
        throw new Error(
          "[운송장번호 변경 실패] 배송중이 아닌 상품의 운송장번호를 입력/변경할 수 없습니다."
        );
      }
      toChangeWayBill.wayBill = number;
      const updatedStatus = await toChangeWayBill.save();
      return updatedStatus;
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  }
}

const orderModel = new OrderModel();
export { orderModel };
