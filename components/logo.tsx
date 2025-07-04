import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/logisticsaowlogo.png"
        alt="AOW Logistics Logo"
        width={50}
        height={60}
        style={{ borderRadius: "50%" }}
      />
      <Image
        src="/logo.png"
        alt="AOW Logistics Logo"
        width={200}
        height={200}
      />
      {/* <span className="text-xl font-bold text-white">AOW Logistics</span> */}
    </Link>
  );
}
