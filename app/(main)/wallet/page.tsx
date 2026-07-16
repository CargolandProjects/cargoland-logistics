import Overview from "@/components/wallet/Overview";
import WalletBanner from "@/components/wallet/WalletBanner";

export default function WalletPage() {
  return (
    <div className="mt-15 md:mt-16.5 relative padding-x">
      <h1 className="font-bold text-[32px] leading-10 ">Wallet</h1>
      <p className="mt-2 text-base font-light leading-6">
        Fund your wallet to pay for shipments
      </p>

      <WalletBanner />
      <Overview />
    </div>
  );
}
