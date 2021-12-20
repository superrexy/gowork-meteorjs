import { BenefitsCollection } from "../collections/benefits";

Meteor.methods({
  "benefit.insert"(title, desc, imageUrl) {
    BenefitsCollection.insert({
      title,
      desc,
      imageUrl,
      createdAt: new Date(),
    });
  },

  "benefit.remove"(benefitId) {
    BenefitsCollection.remove(benefitId);
  },

  "benefit.update"(benefitId, title, desc, imageUrl) {
    BenefitsCollection.update(
      { _id: benefitId },
      {
        $set: {
          title,
          desc,
          imageUrl,
          updatedAt: new Date(),
        },
      }
    );
  },
});
