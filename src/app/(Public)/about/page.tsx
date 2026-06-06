import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="bg-orange-50 py-16 md:py-24 orange-50">
        <div className="mx-auto px-4 container">
          {/* Section Heading */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-extrabold text-orange-600 text-4xl">
              About Us
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              We're committed to creating powerful solutions that help you grow
              and succeed.
            </p>
          </div>

          {/* Content */}
          <div className="flex lg:flex-row flex-col items-center gap-12">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="shadow-xl rounded-3xl overflow-hidden">
                <Image
                  src="/images/about-img.jpg"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2">
              <h3 className="mb-4 font-bold text-orange-500 text-3xl">
                We’re Here To Help You Thrive
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                At Park Buddy, we believe in more than just solutions — we believe
                in transformation. Whether you're just getting started or
                scaling up, our platform is designed to meet your parking
                management needs efficiently and effectively.
              </p>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Our mission is to simplify your everyday parking experience
                through innovation, user-friendly technology, and a commitment
                to customer success. Join the community of users who trust
                Park Buddy to help them save time, reduce stress, and stay in
                control.
              </p>
              <Link href="/contact">
                <button className="bg-orange-400 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium text-white transition duration-300 cursor-pointer">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
