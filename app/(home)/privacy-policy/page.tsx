export default function PrivacyPolicyPage() {
  return (
      <div className="w-full bg-white font-montserrat">
      {/* Header Section as per image_fe771b */}
      <section className="bg-[#FCE9E9] py-24 px-6 text-center">
        <h1 className="font-extrabold text-[48px] md:text-[56px] text-[#0B112B] mb-4">
          Privacy policy
        </h1>
        <p className="font-normal text-[16px] md:text-[18px] text-[#878FA4] max-w-2xl mx-auto leading-relaxed">
            Learn how we collect, use, and protect your personal information while ensuring privacy, security, and transparency across all services.
        </p>
      </section>

      {/* Content Section with Dividers */}
      <section className="py-20 px-6 md:px-32">
        <div className="max-w-4xl mx-auto">
          
          {/* Section 1: Introduction */}
          <div className="border-b border-gray-200 py-10 first:pt-0">
            <h2 className="font-extrabold text-[24px] text-[#0B112B] mb-6 uppercase">
              Introduction
            </h2>
            <div className="space-y-6 text-[#525252] font-normal text-[16px] leading-[1.8]">
              <p>
                Welcome to Cargoland Africa. These Terms and Conditions govern your use of our website, mobile application, and shipping services. By accessing and using our platform, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
              </p>
              <p>
                Cargoland Africa is committed to providing reliable, efficient, and transparent shipping solutions across Africa and internationally. We strive to maintain the highest standards of service quality and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Section 2: Definitions */}
          <div className="border-b border-gray-200 py-10">
            <h2 className="font-extrabold text-[24px] text-[#0B112B] mb-6 uppercase">
              Definitions
            </h2>
            <div className="space-y-6 text-[#525252] font-normal text-[16px] leading-[1.8]">
              <p>
                Cras proin varius vulputate gravida. Lorem pharetra tristique sagittis commodo aliquam at. Vestibulum aliquam lectus quis erat viverra neque interdum. Nunc auctor viverra dolor quis malesuada. Fames enim aliquet elementum nisl volutpat cursus convallis morbi commodo. Mauris nunc quis in pellentesque mi pulvinar id eget cras.
              </p>
            </div>
          </div>

          {/* Section 3: User Responsibilities */}
          <div className="border-b border-gray-200 py-10">
            <h2 className="font-extrabold text-[24px] text-[#0B112B] mb-6 uppercase">
              User Responsibilities
            </h2>
            <div className="space-y-6 text-[#525252] font-normal text-[16px] leading-[1.8]">
              <p>
                Adipiscing felis tristique lobortis semper ornare dictum eu odio aliquam vestibulum. Elit at est purus elementum commodo nibh. Non blandit id lacus pellentesque in natoque tellus nisi. Vulputate sed donec ultrices nulla tristique amet.
              </p>
              <ul className="list-disc list-inside space-y-3 ml-2">
                <li>Provide accurate and complete information when booking shipments</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not ship prohibited or illegal items</li>
              </ul>
            </div>
          </div>

          {/* Contact Section - Clean footer of the text */}
          <div className="py-10">
            <h2 className="font-extrabold text-[24px] text-[#0B112B] mb-6 uppercase">
              Contact Us
            </h2>
            <p className="text-[#525252] mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-2 text-[16px]">
              <p><span className="font-bold text-[#0B112B]">Email:</span> <a href="mailto:info@cargoland.africa" className="text-[#E32027] hover:underline">info@cargoland.africa</a></p>
              <p><span className="font-bold text-[#0B112B]">Phone:</span> (081) 2763-1001</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
