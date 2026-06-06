export default function Pricing() {
  const plans = [
    {
      price: "$10",
      name: "Basic",
      description:
        "Perfect for individuals just starting out. Includes essential features and basic support.",
    },
    {
      price: "$29",
      name: "Standard",
      description:
        "Ideal for small teams or startups. Includes all basic features plus additional tools.",
      popular: true,
    },
    {
      price: "$59",
      name: "Premium",
      description:
        "Best for growing businesses. Get access to premium features and priority support.",
    },
  ];

  return (
    <section className="bg-orange-50 px-4 py-20">
      <div className="mx-auto container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-bold text-orange-600 text-4xl">
            Our Pricing
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Choose the plan that suits your needs. Simple pricing with no hidden
            fees.
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 shadow-md border hover:shadow-lg transition ${
                plan.popular
                  ? "bg-orange-100 border-orange-400 scale-[1.03]"
                  : "bg-white border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="mb-4 font-bold text-orange-700 text-sm text-center uppercase">
                  Most Popular
                </div>
              )}
              <h4 className="font-bold text-orange-600 text-3xl text-center">
                {plan.price}
              </h4>
              <h5 className="mt-2 mb-4 font-semibold text-orange-700 text-xl text-center">
                {plan.name}
              </h5>
              <p className="mb-6 text-gray-600 text-center">
                {plan.description}
              </p>
              <div className="flex justify-center">
                <button className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-full font-semibold text-white transition">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
