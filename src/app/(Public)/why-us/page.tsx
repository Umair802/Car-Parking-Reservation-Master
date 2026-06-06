import {
  FaMoneyCheckAlt,
  FaClock,
  FaSmile,
  FaHeadset,
  FaShieldAlt,
  FaRocket,
  FaCalendarCheck,
  FaHistory,
  FaCreditCard,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaMoneyCheckAlt className="text-orange-500 text-3xl" />,
      title: "Low Booking Fees",
      description:
        "Enjoy transparent pricing with zero hidden charges or surprise costs.",
    },
    {
      icon: <FaClock className="text-orange-500 text-3xl" />,
      title: "24/7 Availability",
      description: "We’re here for you anytime, any day—always ready to help.",
    },
    {
      icon: <FaSmile className="text-orange-500 text-3xl" />,
      title: "Customer Satisfaction",
      description:
        "Thousands of happy clients trust us to deliver exceptional service.",
    },
    {
      icon: <FaHeadset className="text-orange-500 text-3xl" />,
      title: "Dedicated Support",
      description: "Get expert assistance and support whenever you need it.",
    },
    {
      icon: <FaShieldAlt className="text-orange-500 text-3xl" />,
      title: "Secure & Reliable",
      description:
        "Your data and privacy are our top priority—always safe with us.",
    },
    {
      icon: <FaRocket className="text-orange-500 text-3xl" />,
      title: "Fast & Efficient",
      description:
        "Experience blazing-fast performance and turnaround times.",
    },
    {
      icon: <FaCalendarCheck className="text-orange-500 text-3xl" />,
      title: "Advanced Booking",
      description:
        "Easily schedule your parking in advance with a few simple clicks.",
    },
    {
      icon: <FaHistory className="text-orange-500 text-3xl" />,
      title: "Parking History",
      description:
        "View detailed logs of your past parking sessions anytime.",
    },
    {
      icon: <FaCreditCard className="text-orange-500 text-3xl" />,
      title: "Payment History",
      description:
        "Access all your past transactions in one convenient place.",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto container">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-extrabold text-orange-600 text-4xl">
            Why Choose Us
          </h2>
          <p className="text-gray-700 text-lg">
            Discover what sets us apart and why customers love working with us.
          </p>
        </div>

        {/* Features Grid */}
        <div className="gap-10 grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon, title, description }, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg p-8 border border-gray-200 rounded-xl text-center transition"
            >
              <div className="flex justify-center items-center bg-orange-100 mx-auto mb-6 rounded-full w-16 h-16">
                {icon}
              </div>
              <h4 className="mb-3 font-semibold text-orange-700 text-xl">
                {title}
              </h4>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
