import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useTracker } from "meteor/react-meteor-data";
import { OrdersCollection } from "../../../api/collections/orders";
import DateTimeFormat from "../../utils/DateTimeFormat";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

export const Dashboard = () => {
  let [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const orders = useTracker(() =>
    OrdersCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  function closeModal() {
    setImage("");
    setIsOpen(false);
  }

  function openModal(ids) {
    setImage(ids);
    setIsOpen(true);
  }

  const handleConfirm = (id, value) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm It!'
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call("order.confirmation", id, value, (error) => {
          if (error) toast.error(error.reason, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          else {
            toast.success("Konfirmasi Berhasil!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
        
        Swal.fire(
          'Success!',
          'Order Successfully Confirmed!',
          'success'
        )
      }
    })
  };
  return (
    <>
      <div className="relative">
        <Navbar />
        {/* Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex justify-center items-center">
                    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                      <div className="m-4">
                        <img src={image} alt="" />
                      </div>
                      <div className="flex justify-center p-2">
                        <button
                          onClick={closeModal}
                          className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        {/* End Modal */}
        <div className="absolute mt-20 w-full">
          <div className="container py-10">
            <div className="mb-3">
              <h1 className="text-xl font-medium">Dashboard</h1>
              <p className="text-3xl mt-3 font-medium">List Bookings Users</p>
            </div>

            {orders.length == 0 ? (
              <>
                <hr />
                <p className="mt-5 font-semibold text-3xl">Tidak Ada Data</p>
              </>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-screen min-h-screenflex items-center justify-center font-sans">
                  <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                      <table className="min-w-max w-full table-auto">
                        <thead>
                          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Created At</th>
                            <th className="py-3 px-6 text-left">Plan</th>
                            <th className="py-3 px-6 text-left">User</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                          {orders?.map((item) => {
                            return (
                              <tr
                                className="border-b border-gray-200 hover:bg-gray-100"
                                key={item._id}
                              >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                  <span>{DateTimeFormat(item.createdAt)}</span>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                  <span className="font-medium">
                                    {item.plan}
                                  </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                  <div className="flex items-center">
                                    <div className="mr-2">
                                      <img
                                        className="w-6 h-6 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${item.full_name}&background=FFFF00`}
                                      />
                                    </div>
                                    <span>{item.full_name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                  {item.photo_receipt == "" ? (
                                    <span className="py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      Waiting For Payment
                                    </span>
                                  ) : item.status_payment == false ? (
                                    <span className="py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                      Waiting Confirmation
                                    </span>
                                  ) : (
                                    <span className="py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Order Success
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                  <div className="flex item-center justify-center">
                                    <div>
                                      <Link
                                        className="px-6 py-2 bg-blue-500 rounded text-white mr-3 inline-flex"
                                        to={`/invoice/${item._id}`}
                                        target="_blank"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-3"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                          />
                                        </svg>
                                        Cetak Invoice
                                      </Link>
                                    </div>
                                    {item.photo_receipt != "" && (
                                      <>
                                        <div>
                                          <button
                                            className="px-6 py-2 bg-purple-500 rounded text-white inline-flex mr-3"
                                            onClick={() =>
                                              openModal(item.photo_receipt)
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-5 w-5 mr-3"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                              />
                                            </svg>
                                            View Receipt
                                          </button>
                                        </div>
                                        {item.status_payment != true && (
                                          <div>
                                            <button
                                              className="px-6 py-2 bg-green-500 rounded text-white inline-flex"
                                              onClick={() =>
                                                handleConfirm(
                                                  item._id,
                                                  item.status_payment
                                                )
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              Konfirmasi Pembayaran
                                            </button>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
