import { FaUserCircle } from "react-icons/fa";

export default function TestimonialPage({ className }: { className?: string }) {
  return (
    <div className="relative">
      {/* Testimonial Section */}
      <section className="px-4 py-20">
        <div className="mx-auto container">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-orange-600 text-3xl md:text-4xl">
              What Our <span className="text-blue-600">Clients</span> Say
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="mx-auto max-w-4xl">
            <div className={`gap-8 grid grid-cols-1 ${className}`}>
              {/* Testimonial 1 */}
              <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-lg">
                <div className="mb-6">
                  <p className="text-gray-600 italic">
                    "This parking reservation service made my life so much
                    easier. I can now book my parking spot ahead of time,
                    ensuring I never have to waste time looking for a spot. The
                    app is incredibly easy to use, and I love the convenience it
                    provides!"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex justify-center items-center bg-orange-200 mr-4 rounded-full w-16 h-16 text-orange-600">
                    <FaUserCircle size={48} />
                  </div>
                  <div>
                    <h6 className="font-bold text-orange-600">Lisa Adams</h6>
                    <p className="text-gray-500">Frequent Traveler</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-lg">
                <div className="mb-6">
                  <p className="text-gray-600 italic">
                    "I’ve never had such a smooth experience when it comes to
                    parking. The app is intuitive, and the ability to find
                    available spaces in advance has been a game-changer. It’s
                    saved me so much time and stress during my busy days!"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex justify-center items-center bg-orange-200 mr-4 rounded-full w-16 h-16 text-orange-600">
                    <FaUserCircle size={48} />
                  </div>
                  <div>
                    <h6 className="font-bold text-orange-600">Michel Trout</h6>
                    <p className="text-gray-500">Business Owner</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-lg">
                <div className="mb-6">
                  <p className="text-gray-600 italic">
                    "As someone who frequently visits crowded areas, this
                    service has been a lifesaver. No more driving around in
                    circles looking for parking! I can now guarantee a spot when
                    I arrive, making my trips so much more enjoyable."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex justify-center items-center bg-orange-200 mr-4 rounded-full w-16 h-16 text-orange-600">
                    <FaUserCircle size={48} />
                  </div>
                  <div>
                    <h6 className="font-bold text-orange-600">John Doe</h6>
                    <p className="text-gray-500">Urban Commuter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
