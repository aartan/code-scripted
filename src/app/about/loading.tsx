export default function AboutLoading() {
  return (
    <div className="mt-12 mb-12">
      {" "}
      {/* Add margin-top to account for the header */}
      <section className="min-h-[75vh] flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center my-12">
            {/* Image placeholder */}
            <div className="w-full md:w-2/5 relative h-72 rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6 md:mr-8 md:mb-0">
              {/* Decorative element placeholder */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 z-0"></div>

              {/* Image placeholder with pulse animation */}
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>

              {/* Subtle overlay gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent z-20"></div>
            </div>

            {/* Text content placeholders */}
            <div className="w-full md:w-3/5">
              {/* First paragraph placeholder */}
              <div className="mb-4">
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-4/5 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              {/* Second paragraph placeholder */}
              <div className="mb-4">
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-2/3 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Read More button placeholder */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
