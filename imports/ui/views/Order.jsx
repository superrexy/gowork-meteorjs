import React from "react";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/index";
import { useTracker } from "meteor/react-meteor-data";
import { PlansCollection } from "../../api/collections/plans";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Order = () => {
  let navigate = useNavigate();
  let params = useParams();
  const plans = useTracker(() => PlansCollection.findOne({ _id: params.id }));
  const [auth, setAuth] = useRecoilState(authenticated);
  const [form, setForm] = React.useState({
    full_name: "",
    email: "",
    telephone: "",
    occupation: "",
    card_number: "",
    card_expired: "",
    card_cvc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call(
      "order.insert",
      form.full_name,
      form.email,
      form.telephone,
      form.occupation,
      form.card_number,
      form.card_expired,
      form.card_cvc,
      plans.title,
      plans.price,
      auth.user._id,
      (error) => {
        if (error) console.log(error);
        else {
          navigate("/order-success", {replace: true});
        }
      }
    );
  };

  React.useEffect(() => {
    setForm({
      ...form,
      full_name: auth?.user?.profile?.name,
      email: auth?.user?.services?.google?.email,
    });
  }, [auth]);

  return (
    <>
      <div className="relative">
        <Navbar />
        <div className="absolute mt-24 w-full">
          <div className="container mx-auto py-8">
            <div className="flex flex-col justify-center items-center">
              <div className="text-3xl font-semibold">Checkout Page</div>
              <div className="flex w-8/12 mt-[50px]">
                <div className="w-6/12">
                  <img
                    src={plans?.imageUrl}
                    className="object-cover w-[380px] rounded-xl mb-3"
                  />
                  <p className="text-3xl font-semibold">{plans?.title}</p>
                  <p className="text-sm text-gray-700">{plans?.desc}</p>
                </div>
                <div className="w-6/12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label
                          htmlFor="full_name"
                          className="block text-sm font-medium text-gray-800 mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          value={form.full_name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-800 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email"
                          className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-gray-800 mb-2"
                        >
                          Telephone
                        </label>
                        <input
                          type="number"
                          name="telephone"
                          id="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="Telephone"
                          className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="occupation"
                          className="block text-sm font-medium text-gray-800 mb-2"
                        >
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          id="occupation"
                          value={form.occupation}
                          onChange={handleChange}
                          placeholder="Occupation"
                          className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="card_number"
                          className="block text-sm font-medium text-gray-800 mb-2"
                        >
                          Card Number
                        </label>
                        <input
                          type="number"
                          name="card_number"
                          id="card_number"
                          value={form.card_number}
                          onChange={handleChange}
                          placeholder="Card Number"
                          className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                        />
                      </div>
                      <div className="flex gap-4 mb-10">
                        <div className="w-6/12">
                          <label
                            htmlFor="card_expired"
                            className="block text-sm font-medium text-gray-800 mb-2"
                          >
                            Expired
                          </label>
                          <input
                            type="month"
                            name="card_expired"
                            id="card_expired"
                            value={form.card_expired}
                            onChange={handleChange}
                            placeholder="Expired"
                            className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                          />
                        </div>
                        <div className="w-6/12">
                          <label
                            htmlFor="card_cvc"
                            className="block text-sm font-medium text-gray-800 mb-2"
                          >
                            CVC
                          </label>
                          <input
                            type="number"
                            name="card_cvc"
                            id="card_cvc"
                            value={form.card_cvc}
                            onChange={handleChange}
                            placeholder="CVC"
                            className="block px-3 py-2 border rounded-full w-full text-sm leading-tight"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          type="submit"
                          className="block bg-secondary-900 py-2 w-full rounded-full text-white hover:bg-blue-900 transition-colors duration-200"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
