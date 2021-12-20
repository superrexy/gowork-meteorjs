import { OrdersCollection } from "../collections/orders";

Meteor.methods({
  "order.insert"(
    full_name,
    email,
    telephone,
    occupation,
    card_number,
    card_expired,
    card_cvc,
    plan,
    plan_price,
    user_id
  ) {
    OrdersCollection.insert({
      full_name,
      email,
      telephone,
      occupation,
      card_number,
      card_expired,
      card_cvc,
      plan,
      plan_price,
      user_id,
      status_payment: false,
      photo_receipt: "",
      createdAt: new Date(),
    });
  },

  "order.remove"(orderId) {
    OrdersCollection.remove(orderId);
  },

  "order.update_receipt"(orderId, photo_receipt) {
    OrdersCollection.update({ _id: orderId }, { $set: { photo_receipt } });
  },

  "order.confirmation"(orderId, value) {
    OrdersCollection.update({_id: orderId}, {$set : {status_payment: !value}});
  },

  "order.update"(
    orderId,
    full_name,
    email,
    telephone,
    occupation,
    card_number,
    card_expired,
    card_cvc,
    plan,
    user_id,
    photo_receipt
  ) {
    OrdersCollection.update(
      { _id: orderId },
      {
        $set: {
          full_name,
          email,
          telephone,
          occupation,
          card_number,
          card_expired,
          card_cvc,
          plan,
          user_id,
          status_payment: false,
          photo_receipt,
          updatedAt: new Date(),
        },
      }
    );
  },
});
