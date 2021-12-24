import React from "react";

export const Footer = () => {
  return (
    <section className="footer bg-primary-500">
      <div className="pt-10 pb-20">
        <div className="grid grid-cols-10 container gap-16">
          <div className="col-span-6">
            <div className="text-white font-medium text-4xl tracking-wider">
              Go-Work
            </div>
            <p className="text-white font-light mt-5 leading-snug tracking-wide">
              Jalan Cyber No 22A<br />Cyber, Jakarta Utara
            </p>
          </div>
          <div className="col-span-2">
            <div className="text-base font-bold text-white mb-5">Company</div>
            <div className="mt-3">
              <a href="#" className="text-base font-normal text-white">
                About Us
              </a>
            </div>
            <div className="mt-3">
              <a href="#" className="text-base font-normal text-white">
                Blog
              </a>
            </div>
            <div className="mt-3">
              <a href="#" className="text-base font-normal text-white">
                Join Us
              </a>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-base font-bold text-white mb-5">Help</div>
            <div className="mt-3">
              <a href="#" className="text-base font-normal text-white">
                System Status
              </a>
            </div>
            <div className="mt-3">
              <a href="#" className="text-base font-normal text-white">
                Talk to Support
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-white mx-auto text-center border-t border-primary-300">
        <p>2021 Go-Work | All Rights Reserved</p>
      </div>
    </section>
  );
};
