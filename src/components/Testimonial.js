import React from "react";

import QUOTE_IMG from "../images/testimonials/quote.png";
import GSU_LOGO from "../images/testimonials/gsu.png";
import MS_VICKIE from "../images/testimonials/MsVickie.png";

export default function Testimonial() {
  return (
    <section id="testimonial" className="f-container">
      <div className="mt-16 flex flex-col gap-0 md:gap-0">
        <img
          src={QUOTE_IMG}
          alt="Quote"
          className="h-[90px] w-[79px] object-contain"
          loading="lazy"
          decoding="async"
        />

          <div className="mt-6 testimonial-row">
            <div className="testimonial-left text-neutral-800">
            <p className="text-[#86868B]">
              I had the pleasure of supervising <span className="about-highlight">Thilak Goud Voruganti</span> during his time
              as a <span className="about-highlight">Graduate Assistant</span> at the LTC. He was consistently <span className="about-highlight">dependable</span>,
              professional, and thoughtful in how he supported both students and our ongoing <span className="about-highlight">research efforts</span>. Thilak
              brought a <span className="about-highlight">calm, steady presence</span> to the team, always willing to take initiative and help wherever needed.
              Whether assisting with academic support or contributing to research work, he approached everything with
              focus and integrity. He was a great asset to our center, and I’m confident he’ll bring that same <span className="about-highlight">commitment</span> wherever he goes.
            </p>
          </div>

            <div className="testimonial-right">
              <div className="flex flex-col items-end gap-2">
              <img
                src={GSU_LOGO}
                alt="Georgia State University"
                className="h-[126px] w-[155px] object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="text-[16px] leading-[20px] font-semibold text-neutral-900">
                Georgia State University
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white">
              <img
                src={MS_VICKIE}
                alt="Vickie Frazier"
                className="h-[100px] w-[97.11px] object-contain"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[16px] leading-[22px] font-semibold text-neutral-900">Vickie Frazier</span>
                <span className="text-[16px] leading-[22px] text-neutral-800">Supervisor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
