import { Meteor } from "meteor/meteor";
import { PlansCollection } from "./collections/plans";
import { BenefitsCollection } from "./collections/benefits";
import { OrdersCollection } from "./collections/orders";

const PlanInsert = ({ title, desc, imageUrl, price, features }) => {
  PlansCollection.insert({
    title,
    desc,
    imageUrl,
    price,
    features,
    createdAt: new Date(),
  });
};

const BenefitInsert = ({title, desc, imageUrl}) => {
  BenefitsCollection.insert({
    title,
    desc,
    imageUrl,
    createdAt: new Date(),
  });
};

Meteor.startup(() => {
  if (BenefitsCollection.find().count() === 0) {
    BenefitInsert({
        title: 'Benefit 1',
        desc: 'Lorem Ipsum',
        imageUrl: 'https://xwork.co/img/lp-images/LP-CoworkingSpace.webp'
    })
    BenefitInsert({
        title: 'Benefit 2',
        desc: 'Lorem Ipsum',
        imageUrl: 'https://xwork.co/img/lp-images/LP-CoworkingSpace.webp'
    })
    BenefitInsert({
        title: 'Benefit 3',
        desc: 'Lorem Ipsum',
        imageUrl: 'https://xwork.co/img/lp-images/LP-CoworkingSpace.webp'
    })
    BenefitInsert({
        title: 'Benefit 4',
        desc: 'Lorem Ipsum',
        imageUrl: 'https://xwork.co/img/lp-images/LP-CoworkingSpace.webp'
    })
  }

  if (PlansCollection.find().count() === 0) {
    PlanInsert({
      title: "Basic Plan",
      desc: "Paket Sejuta Umat",
      imageUrl: 'https://blog.go-work.com/wp-content/uploads/2020/02/coworking-space-near-me.jpg',
      price: "50000",
      features: [
        {
          status: true,
          text: "Lorem Ipsum",
        },
        {
          status: false,
          text: "Lorem Ipsum",
        },
        {
          status: false,
          text: "Lorem Ipsum",
        },
        {
          status: false,
          text: "Lorem Ipsum",
        },
        {
          status: false,
          text: "Lorem Ipsum",
        },
      ],
    });

    PlanInsert({
      title: "Premium Plan",
      desc: "Paket Rekomendasi",
      imageUrl: 'https://blog.go-work.com/wp-content/uploads/2020/02/coworking-space-near-me.jpg',
      price: "100000",
      features: [
        {
          status: true,
          text: "Lorem Ipsum",
        },
        {
          status: true,
          text: "Lorem Ipsum",
        },
        {
          status: true,
          text: "Lorem Ipsum",
        },
        {
          status: true,
          text: "Lorem Ipsum",
        },
        {
          status: true,
          text: "Lorem Ipsum",
        },
      ],
    });
  }
});
