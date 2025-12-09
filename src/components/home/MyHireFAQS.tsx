import React from "react";

const MyHireFAQ: React.FC = () => {
  const faqs = [
    {
      q: "What do I need to hire a car?",
      a: "You need a valid driver’s license, a national ID or passport, and a security deposit. Renters must meet age and driving experience requirements.",
    },
    {
      q: "How much does it cost to hire a car?",
      a: "Costs vary depending on the vehicle type, location, and rental duration. Economy cars typically start around KSh 3,500 per day.",
    },
    {
      q: "Is insurance included?",
      a: "Basic third-party insurance is included. Extra coverage for damage or theft may require additional payment.",
    },
    {
      q: "Can someone else drive the car?",
      a: "Only authorized drivers listed in the agreement can drive the vehicle. Extra drivers may be added for an additional fee.",
    },
    {
      q: "Is fuel included in the rental?",
      a: "Fuel is not included. The car should be returned with the same fuel level as when it was picked up.",
    },
    {
      q: "Can I extend my rental?",
      a: "Yes. You can extend your rental period by notifying the rental team early and paying the additional charges.",
    },
  ];

  return (
    <section className="bg-white py-16 px-5">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Car Rental FAQs
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              tabIndex={0}
              className="collapse collapse-plus bg-[#f7f7f7] rounded-xl border border-gray-200"
            >
              <div className="collapse-title text-lg font-medium text-gray-900">
                {item.q}
              </div>
              <div className="collapse-content text-gray-600 leading-relaxed">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MyHireFAQ;
