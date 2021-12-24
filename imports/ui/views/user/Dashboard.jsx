import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { OrdersCollection } from "../../../api/collections/orders";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { authenticated } from "../../store";
import ImageToBase64 from "../../utils/ImageToBase64";
import CurrencyToIDR from "../../utils/CurrencyToIDR";
import DateTimeFormat from "../../utils/DateTimeFormat";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

export const Dashboard = () => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const [orderId, setOrderId] = React.useState("");
  const [image, setImage] = React.useState("");
  let [isOpen, setIsOpen] = React.useState(false);
  const orders = useTracker(() =>
    OrdersCollection.find(
      { user_id: auth?.user?._id },
      { sort: { createdAt: -1 } }
    ).fetch()
  );

  function closeModal() {
    setOrderId("");
    setIsOpen(false);
  }

  function openModal(ids) {
    setOrderId(ids);
    setIsOpen(true);
  }

  const handleImage = (e) => {
    e.preventDefault();
    ImageToBase64(e.target.files[0], (res) => {
      setImage(res);
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call("order.remove", id, (error) => {
          if (error)
            toast.error(error.reason, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          else {
            toast.success("Invoice Berhasil di Hapus!", {
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
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    Meteor.call("order.update_receipt", orderId, image, (error) => {
      if (error) {
        toast.error(error.reason, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        closeModal();
      } else {
        toast.success("Upload Bukti Pembayaran Berhasil!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        closeModal();
      }
    });
  };

  return (
    <>
      <div className="relative">
        <Navbar />
        <div className="absolute mt-20 w-full">
          <div className="container py-10">
            <div className="mb-3">
              <h1 className="text-xl font-medium">Dashboard</h1>
              <p className="text-3xl mt-3 font-medium">My Bookings</p>
            </div>

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
                      <form onSubmit={handleUpload}>
                        <div className="flex justify-center items-center">
                          <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                            <div className="m-4">
                              <label className="inline-block mb-2 text-gray-500">
                                File Upload
                              </label>
                              <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                  <div className="flex flex-col items-center justify-center pt-7">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                      Attach a file
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    className="opacity-0"
                                    onChange={handleImage}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-center p-2">
                              <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">
                                Upload Image
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
            {/* End Modal */}

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  {orders.length == 0 ? (
                    <>
                      <hr />
                      <p className="mt-5 font-semibold text-3xl">
                        Tidak Ada Data
                      </p>
                    </>
                  ) : (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders?.map((item) => {
                            return (
                              <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.plan}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {DateTimeFormat(item.createdAt)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {CurrencyToIDR(item.plan_price)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {item.photo_receipt == "" ? (
                                    <span className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      Waiting For Payment
                                    </span>
                                  ) : item.status_payment == false ? (
                                    <span className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      Waiting Confirmation
                                    </span>
                                  ) : (
                                    <span className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Order Success
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  {item.status_payment == false && (
                                    <button
                                      className="px-4 py-2 rounded-xl text-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-200 inline-flex mr-2"
                                      onClick={() => openModal(item._id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                      </svg>
                                      Upload Receipt
                                    </button>
                                  )}

                                  {item.status_payment && (
                                    <>
                                      <Link
                                        target="_blank"
                                        to={`/invoice/${item._id}`}
                                        className="mr-3 px-4 py-2 rounded-xl text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 inline-flex"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        View Invoice
                                      </Link>
                                      <button onClick={() => handleDelete(item._id)} className="px-4 py-2 rounded-xl text-sm text-white bg-red-600 hover:bg-red-500 transition-all duration-200 inline-flex">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                          />
                                        </svg>
                                        Delete Data
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
