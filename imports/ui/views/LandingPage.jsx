import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { PlansCollection } from "../../api/collections/plans";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import CurrencyToIDR from "../utils/CurrencyToIDR";

const LandingPage = () => {
  const plans = useTracker(() => PlansCollection.find({}).fetch());

  return (
    <>
      <Navbar />
      <section className="bg-primary-300 w-full" id="home">
        <div className="min-h-screen">
          <div className="container">
            <div className="flex justify-center items-center py-20 2xl:py-40">
              <div className="h-96 flex flex-col justify-center">
                <p className="text-white text-7xl 2xl:text-8xl font-semibold mb-3">
                  The future
                  <br /> of work <br />
                  is here
                </p>
                <p className="text-gray-300 text-base mb-8">
                  Our bootcamp is helping junior developers who
                  <br />
                  are really passionate in the programming.
                </p>
                <div>
                  <LinkScroll
                    spy={true}
                    smooth={true}
                    to="booking"
                    className="py-4 px-6 bg-secondary-500 text-white rounded-full font-semibold hover:bg-primary-500 hover:bg-opacity-75 hover:text-primary transition-colors delay-100"
                  >
                    Booking Now
                  </LinkScroll>
                </div>
              </div>
              <div>
                <img
                  className="bg-cover w-11/12 ml-auto"
                  src="/img/banner.png"
                  alt=""
                />
              </div>
            </div>
            <div className="2xl:mt-20 -mt-5">
              <img src="/img/techstack.png" alt="" className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-300" id="benefits">
        <div className="pt-16 pb-24">
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-center text-3xl font-semibold tracking-wide mb-8">
              A platform designed to elevate your
              <br />
              coworking experience
            </p>

            <div className="flex justify-center items-center mb-20">
              <div className="w-4/12">
                <img src="/img/box-1.png" alt="" />
              </div>
              <div className="w-4/12">
                <p className="text-3xl tracking-wide  font-semibold text-white">
                  Networking
                </p>
                <p className="text-gray-300 tracking-wide">
                  Coworking space increases the chances of meeting like-minded
                  people is a great incentive for your business development. You
                  get to interact with people from various industries and
                  sectors. It only fosters a sense of community, but interacting
                  with high-performing individuals will also boost your own
                  self-confidence along with opening doors for enhancing your
                  service.
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mb-20">
              <div className="w-4/12">
                <p className="text-3xl tracking-wide  font-semibold text-white">
                  Great Offers and Discounts
                </p>
                <p className="text-gray-300 tracking-wide">
                  Working from a shared office space has a variety of benefits.
                  Such coworking spaces offer a lot of discounts to members.
                  Stay updated with the latest offers make the best use of it.
                  Such offers and discounts are provided to make a member’s life
                  in the coworking space convenient and enhance the work-life
                  balance.
                </p>
              </div>
              <div className="w-4/12">
                <img src="/img/box-2.png" alt="" className="ml-auto" />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-4/12">
                <img src="/img/box-3.png" alt="" />
              </div>
              <div className="w-4/12">
                <p className="text-3xl tracking-wide  font-semibold text-white">
                  Improve Productivity
                </p>
                <p className="text-gray-300 tracking-wide text">
                  Around 68% of people find they can focus better while working
                  in a coworking space. If you prefer to work out of office but
                  yet in a professional zone, renting a business space from a
                  coworking site will improve your focus level. Plus the
                  additional benefits a coworking space provides will always
                  outweigh the cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="h-[500px] w-full">
          <img
            src="/img/cowork.jpg"
            alt=""
            className="bg-cover object-cover h-full w-full"
          />
        </div>
      </section>

      <section className="bg-primary-400" id="booking">
        <div className="pt-16 pb-24 mx-auto max-w-screen-2xl">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center">
              <div className="text-5xl text-white text-bold leading-tight">
                Upgrade Your Accesibility <br />
                with <span className="text-blue-500"> Professional Plan</span>
              </div>
              <p className="text-base font-normal text-gray-300 mt-9">
                Choose plan that suits your budget. Every plan has their own{" "}
                <br /> benefits so careful on your decision, its starts from
                here!
              </p>
            </div>
            <div className="grid grid-cols-2 mt-24 px-60">
              <div className="mx-auto">
                <div className="px-8 py-10 rounded-xl max-w-max">
                  <div className="text-center text-gray-300">
                    <div>{plans[0]?.title}</div>
                    <div className="mt-5 mb-2 font-semibold price text-light-1 text-[32px]">
                      {CurrencyToIDR(plans[0]?.price)}
                    </div>
                    <div>{plans[0]?.desc}</div>
                    <div className="feature-list mt-5 flex flex-col items-center gap-3">
                      {plans[0]?.features?.map((item, index) => {
                        if (item.status) {
                          return (
                            <p
                              className="inline-flex tracking-wide"
                              key={index}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 mr-2 text-green-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                              {item.text}
                            </p>
                          );
                        } else {
                          return (
                            <p
                              className="inline-flex tracking-wide text-gray-500"
                              key={index}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 mr-2 text-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                              {item.text}
                            </p>
                          );
                        }
                      })}
                    </div>
                    <div className="mt-5">
                      <Link
                        className="px-4 py-2 text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors duration-150 shadow-xl"
                        to={`/order/${plans[0]?._id}`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto bg-gradient-to-b from-blue-900 to-secondary-900 rounded-xl">
                <div className="px-8 py-10 rounded-xl max-w-xs">
                  <div className="text-center text-gray-300">
                    <div>{plans[1]?.title}</div>
                    <div className="mt-5 mb-2 font-semibold price text-light-1 text-[32px]">
                      {CurrencyToIDR(plans[1]?.price)}
                    </div>
                    <div className="description-package">{plans[1]?.desc}</div>
                    <div className="feature-list mt-5 flex flex-col items-center gap-3">
                      {plans[1]?.features?.map((item, index) => {
                        if (item.status) {
                          return (
                            <p
                              className="inline-flex tracking-wide"
                              key={index}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 mr-2 text-green-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                              {item.text}
                            </p>
                          );
                        } else {
                          return (
                            <p
                              className="inline-flex tracking-wide text-gray-500"
                              key={index}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 mr-2 text-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                              {item.text}
                            </p>
                          );
                        }
                      })}
                    </div>
                    <div className="mt-5">
                      <Link
                        className="px-4 py-2 text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors duration-150 shadow-xl"
                        to={`/order/${plans[1]?._id}`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <Footer />
      </section>
    </>
  );
};

export default LandingPage;
