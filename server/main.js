import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/fixtures";
import "../imports/api/methods";

const SEED_EMAIL = "bintangrezeka@go-work.dev";
const SEED_PASSWORD = "password123";

Meteor.startup(() => {
  if (!Accounts.findUserByEmail(SEED_EMAIL)) {
    Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
      profile: {
        name: 'Bintang Rezeka Ramadani',
        role: 'admin'
      }
    });
  }

  ServiceConfiguration.configurations.upsert(
    {
      service: "google",
    },
    {
      $set: {
        clientId:
          "977761096714-5tco8hjs1c2n13hnh573fcqs9oadocah.apps.googleusercontent.com",
        loginStyle: "popup",
        secret: "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",
      },
    }
  );

  Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
      user.profile = options.profile;
    }
    var currentUser = Meteor.user();

    console.log(currentUser);

    if (currentUser) {
      if (user.services.google) {
        console.log("google");
        Meteor.users.update(
          { _id: currentUser._id },
          { $set: { "services.google": user.services.google, karma: 0 } }
        );
      }
      throw new Meteor.Error(
        Accounts.LoginCancelledError.numericError,
        "Service added to existing user (or something similar)"
      );
    }
    console.log("register success");
    return user;
  });
});
