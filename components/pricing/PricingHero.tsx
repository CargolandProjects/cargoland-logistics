import { pricingHero } from '@/assets/images'
import Image from 'next/image'

const PricingHero = () => {
  return (
    <section className="padding-x pt-11.5 pb-[72px]">
        {/* Hero */}
        <div className="relative px-11 py-20.5 rounded-lg overflow-hidden text-white">
          <h1 className="relative z-10 text-2xl md:text-[48px] font-extrabold leading-8 md:leading-14 max-w-[449px]">
            Live Shipping Rates br.sm:ho at Your Fingertips
          </h1>
          <p className="relative z-10 mt-6 text-sm md:text-lg leading-5.5 md:leading-7">
            Instantly check accurate shipping costs across routes.
          </p>

          <div className="absolute inset-0">
            <Image
              src={pricingHero}
              alt="shipping page hero image"
              className="size-full object-cover"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/10" />
          </div>
        </div>
      </section>
  )
}

export default PricingHero