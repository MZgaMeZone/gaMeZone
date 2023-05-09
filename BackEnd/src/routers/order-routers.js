import { Router } from "express";
import { orderService } from "../services/index.js";
import { orderChecker } from "../middlewares/orderValidation.js";
const orderRouter = Router();

//-----------------userId로 주문내역 검색하기-----------------//
orderRouter.get("/:userid", async (req, res) => {
  const userEmail = req.params.userid;
  console.log("🔎", userEmail, " 의 주문내역을 조회 중...");
  const dbdata = await orderService.findUserOrder(userEmail);
  res.json(dbdata);
  console.log("✔️", userEmail, " 의 주문내역 출력 완료.");
});
//-------------[Admin] 모든 유저의 주문내역 검색하기-------------//
orderRouter.get("/", async (req, res) => {
  const dbdata = await orderService.findAllOrdersByAdmin();
  console.log("🔎 모든 유저의 주문정보를 조회합니다...");
  res.json(dbdata);
  console.log("✔️ 주문정보 출력 완료!");
});
//-------------주문번호로 주문내역 검색하기-------------//
orderRouter.get("/order/:index", async (req, res) => {
  const orderIndex = req.params.index;
  const dbdata = await orderService.findOrderIndex(orderIndex);
  console.log("🔎 해당 주문번호의 주문정보를 조회합니다...");
  res.json(dbdata);
  console.log("✔️ 주문정보 출력 완료!");
});
//-----------------유저가 새로운 주문 추가하기-----------------//
orderRouter.post("/", orderChecker.newOrderJoi, async (req, res, next) => {
  console.log("🔄 새로운 주문내역을 만드는 중...");
  const orderInfo = req.body;
  try {
    const dbdata = await orderService.createNewOrder(orderInfo);
    console.log("✔️ 주문 완료. 감사합니다.");
    res.json(dbdata);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});
//-----------주문번호로 유저의 주문정보 수정하기--------------//
orderRouter.patch(
  "/information",
  orderChecker.changeOrderJoi,
  async (req, res, next) => {
    const { orderIndex, ...updateInfo } = req.body;
    console.log("🔄 주문번호 ", orderIndex, "의 주문정보를 수정하는 중...");
    try {
      const dbdata = await orderService.changeUsersOrder(
        orderIndex,
        updateInfo
      );
      res.json(dbdata);
      console.log("✔️ 주문번호 ", orderIndex, "의 주문정보 수정 완료.");
    } catch (err) {
      console.log(`❌ ${err}`);
      next(err);
    }
  }
);
//------------[Admin] 주문정보로 배송 상태 변경하기 -------------//
orderRouter.patch(
  "/shippingstatus",
  orderChecker.changeStatusJoi,
  async (req, res, next) => {
    try {
      const orderIndex = req.body.orderIndex;
      const status = req.body.shippingStatus;
      console.log("🔄 주문번호 ", orderIndex, " 의 배송정보를 수정하는 중...");
      const dbdata = await orderService.changeStatusByAdmin(orderIndex, status);
      res.json(dbdata);
      console.log("✔️ 주문번호 ", orderIndex, " 의 배송정보 변경 완료.");
    } catch (err) {
      console.log(`❌ ${err}`);
      next(err);
    }
  }
);
//------------[Admin] 주문정보로 운송장번호 변경하기 -------------//
orderRouter.patch(
  "/waybill",
  orderChecker.changeWayBillJoi,
  async (req, res, next) => {
    try {
      const orderIndex = req.body.orderIndex;
      const wayBill = req.body.waybill;
      console.log(
        "🔄 주문번호 ",
        orderIndex,
        " 의 운송장정보를 수정하는 중..."
      );
      const dbdata = await orderService.changeWayBillByAdmin(
        orderIndex,
        wayBill
      );
      res.json(dbdata);
      console.log("✔️ 주문번호 ", orderIndex, " 의 운송장번호 변경 완료.");
    } catch (err) {
      console.log(`❌ ${err}`);
      next(err);
    }
  }
);
//-------------[Admin] 주문정보로 해당 주문 삭제하기 --------------//
orderRouter.delete("/admin/:number", async (req, res, next) => {
  try {
    const orderIndex = req.params.number;
    console.log("🔄 주문번호 ", orderIndex, " 의 주문내역을 삭제하는 중...");
    await orderService.deleteOrderByAdmin(orderIndex);
    res.send("주문내역 삭제 완료");
    console.log("✔️ 주문번호 ", orderIndex, " 의 주문내역 삭제 완료.");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});
//-----------------유저가 주문정보로 본인의 주문 취소하기 -----------------//
orderRouter.delete("/:number", async (req, res, next) => {
  try {
    const orderIndex = req.params.number;
    console.log("🔄 주문번호 ", orderIndex, " 의 주문을 취소하는 중...");
    await orderService.deleteOrderByUser(orderIndex);
    res.send("주문 취소 완료");
    console.log("✔️ 주문번호 ", orderIndex, " 의 주문 취소 완료.");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { orderRouter };

// ------ Database 추가(수정)용 툴 ----- // 전부 get으로 수정하고 사용
// const orderInfo = {
//   buyer: "주문추가3",
//   buyerEmail: "changetest@gmail.com",
//   buyerPhoneNumber: "010-1111-1111",
//   recipientName: "쟤말고저한테주세요",
//   recipientPhoneNumber: "010-0000-0000",
//   shippingAddress: "제주도",
//   shippingRequest: "빨리 주세용",
//   shippingStatus: "배송 준비중",
//   productList: ["레드와인99"],
//   priceList: [100000],
//   totalPrice: 100000,
//   orderIndex: 0,
// };
// const updateInfo = {
//   buyerEmail: "aaaaaaaaaaaaaaaaaaaaaaaaatest@gmail.com",
//   buyerPhoneNumber: "010-2222-1111",
//   recipientName: "나한테 주세요",
//   recipientPhoneNumber: "010-0000-0000",
//   shippingAddress: "명왕성으로주세욬ㅋㅋㅋㅋㅋㅋ",
//   shippingRequest: "아무때나~~~~~주세요~~~~~~~",
// };
