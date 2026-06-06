import Header from "@/components/Header";
import Image from "next/image";
import About from "../about/page";
import WhyChooseUs from "../why-us/page";
import Pricing from "../pricing/page";
import TestimonialPage from "../testimonials/page";
import Contact from "../contact/page";

export default function Home() {
  return (
    <>
      {/* Content Section */}
      <section className="relative flex md:flex-row flex-col items-center mx-auto px-4 py-12 md:py-20 md:pt-44 container">
        <div className="flex md:flex-row flex-col justify-between items-center w-full">
          {/* Left Side */}
          <div className="space-y-6 mb-6 md:mb-0 md:w-1/2 max-w-lg">
            <h1 className="font-bold text-3xl md:text-5xl md:text-left text-center leading-tight">
              Reserve Your Parking Spot in Seconds
            </h1>
            <p className="text-lg md:text-left text-center">
              Tired of circling the block looking for parking? With our
              easy-to-use platform, you can reserve a spot ahead of time,
              ensuring your parking experience is hassle-free. Whether it's for
              a day at the office or a weekend out, we've got you covered.
            </p>
            <p className="mt-4 text-lg md:text-left text-center">
              Choose from a variety of convenient parking options and book your
              spot instantly from the comfort of your home or on the go.
            </p>
            <div className="mt-8 md:text-left text-center">
              <button className="bg-orange-400 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold text-white transition duration-300">
                Book Now
              </button>
            </div>
          </div>

          {/* Right Side with Video */}
          <div className="relative w-full md:w-1/2">
            <video
              autoPlay
              loop
              muted
              className="shadow-lg rounded-lg w-full h-full object-cover"
            >
              <source src="/video/animation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <TestimonialPage className="!flex xl:!flex-row !flex-col !items-center !gap-3" />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
