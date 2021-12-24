import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useTracker } from "meteor/react-meteor-data";
import { OrdersCollection } from "../../api/collections/orders";
import { useParams } from "react-router-dom";
import DateTimeFormat from "../utils/DateTimeFormat";
import CurrencyToIDR from "../utils/CurrencyToIDR";
import Skeleton from 'react-loading-skeleton'

export const Invoice = () => {
  let params = useParams();
  const [hidden, setHidden] = React.useState(false);
  const order = useTracker(() => OrdersCollection.findOne({ _id: params.id }));

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice Order',
    onBeforePrint: () => setHidden(true),
    onBeforeGetContent: () => setHidden(true),
    content: () => componentRef.current,
    onAfterPrint: () => setHidden(false),
  });

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container py-10">
        <div className="">
          <h4 className="text-3xl font-semibold">Invoice Booking</h4>
          <p className="text-gray-500 text-base tracking-wide">
            Bukti Pembayaran
          </p>
          <button onClick={handlePrint} className='mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-800 transition-colors duration-200 text-white rounded-full'>Cetak Invoice</button>
        </div>
        

        <div className="p-5 bg-gray-200 max-w-[800px] rounded-lg mt-3">
          <div className="information bg-white p-7" ref={componentRef}>
            <div className="flex items-center">
              <div className="w-6/12">
                <p className="text-3xl font-semibold">Go-Work</p>
                <div className="mt-2">
                  <p>
                    Invoice ID: <span className="font-bold">{params.id || <Skeleton />}</span>
                  </p>
                  <p>
                    Booking: <span className="font-bold">{order?.plan}</span>
                  </p>
                </div>
              </div>
              <div className="w-6/12 text-right">
                <p className="text-sm tracking-wide">
                  Pembayaran: {DateTimeFormat(order?.createdAt)}
                </p>
                {order?.photo_receipt == "" ? (
                  <p className="text-sm tracking-wide">
                    Status :{" "}
                    <span className="font-bold">Waiting For Payment</span>
                  </p>
                ) : order?.status_payment == false ? (
                  <p className="text-sm tracking-wide">
                    Status :{" "}
                    <span className="font-bold">Waiting Confirmation</span>
                  </p>
                ) : (
                  <p className="text-sm tracking-wide">
                    Status : <span className="font-bold">Order Success</span>
                  </p>
                )}
              </div>
            </div>
            <hr className="my-5 border-1" />
            <div className="flex">
              <div className="w-6/12">
                <p>Bill From:</p>
                <p>
                  <span className="font-bold">Go-Work</span>
                </p>
                <p>Jalan Sumbawa No.66D, Ponorogo</p>
                <p>(0352) 19216811</p>
                <p>go-work.dev</p>
              </div>
              <div className="w-6/12 text-right">
                <p>Bill To:</p>
                <p>
                  <span className="font-bold">{order?.full_name || <Skeleton />}</span>
                </p>
                <p>{order?.email || <Skeleton />}</p>
                <p>{order?.occupation || <Skeleton />}</p>
              </div>
            </div>
            <table className="table-auto mt-5 w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-100">
                <tr>
                  <th className="p-2 text-left whitespace-nowrap font-semibold">
                    #
                  </th>
                  <th className="p-2 text-center whitespace-nowrap font-semibold">
                    Booking
                  </th>
                  <th className="p-2 text-center whitespace-nowrap font-semibold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                <tr>
                  <td className="p-2 text-left whitespace-nowrap">1</td>
                  <td className="p-2 text-center whitespace-nowrap">
                    {order?.plan || <Skeleton />}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap">
                    {CurrencyToIDR(order?.plan_price) ||  <Skeleton />}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
