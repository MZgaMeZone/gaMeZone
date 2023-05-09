import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    //----------------주문 리스트----------------//
    orderList: {
      type: [
        {
          _id: false,
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          amount: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "0개의 상품을 주문할 수 없습니다.",
      },
    },

    totalPayPrice: {
      // 구매할 상품의 총 가격. 프론트단에서 넘겨받을 예정임.
      type: Number,
      required: true,
    },

    deliveryFee: {
      // 배송비. 0원이면 0원이라고 표시해야 함.
      type: Number,
      required: true,
    },

    //----------------주문자 정보----------------//
    orderIndex: {
      // 주문번호 (서버에 저장할 때 자동 생성)
      type: String,
      required: true,
    },
    buyer: {
      // 주문자 이름
      type: String,
      required: true,
    },
    buyerEmail: {
      // 주문자 이메일
      type: String,
      required: true,
      // select: true,
    },
    buyerPhoneNumber: {
      // 주문자 연락처
      type: String,
      required: true,
      // select: true,
    },
    //----------------수령자 정보----------------//
    recipientName: {
      // 받는 사람 이름
      type: String,
      required: true,
    },
    recipientPhoneNumber: {
      // 받는 사람 전화번호
      type: String,
      required: true,
    },
    //----------------배송 정보----------------//
    shippingAddress: {
      // 배송 주소
      type: String,
      required: true,
    },
    shippingExtraAddress: {
      // 배송 추가 주소
      type: String,
      required: false,
    },
    // shippingPostalCode: {
    //   // 배송지 우편번호
    //   type: String,
    //   // required: true,
    // },
    shippingRequest: {
      // 배송 요청사항 - 필수는 아님.
      type: String,
      required: false,
    },
    shippingStatus: {
      // 주문 상태 : 상품준비중 / 배송중 / 배송완료
      type: String,
      require: true,
    },
    wayBill: {
      // 운송장 번호. 변경 가능함. 배송중으로 바뀌면 부여해야 하니 필수도 아님.
      type: String,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "orders",
  }
);

// module.exports = OrderSchema;
export default OrderSchema;
