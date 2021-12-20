import { PlansCollection } from "../collections/plans";

Meteor.methods({
  "plan.insert"(title, desc, imageUrl, price, features) {
    PlansCollection.insert({
      title,
      desc,
      imageUrl,
      price,
      features,
      createdAt: new Date(),
    });
  },

  "plan.remove"(planId) {
    PlansCollection.remove(planId);
  },

  "plan.update"(planId, title, desc, imageUrl, price, features) {
    PlansCollection.update(
      { _id: planId },
      {
        $set: {
          title,
          desc,
          imageUrl,
          price,
          features,
          updatedAt: new Date(),
        },
      }
    );
  },
});
