import { Meteor } from "meteor/meteor";

Meteor.startup(function () {
  smtp = {
    username: "a30b5dcc8f6bac",
    password: "11e3eb68f6fa6f",
    server: "smtp.mailtrap.io",
    port: 2525,
  };

  process.env.MAIL_URL =
    "smtp://" +
    encodeURIComponent(smtp.username) +
    ":" +
    encodeURIComponent(smtp.password) +
    "@" +
    encodeURIComponent(smtp.server) +
    ":" +
    smtp.port;
});
