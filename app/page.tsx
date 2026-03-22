import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#fef7ef] h-screen px-10 py-5">
      <nav className="flex flex-row px-4 justify-between">
        <h1>Ysws gen</h1>
        <div className="justify-center items-center flex flex-row gap-4 text-[#3b2314]">
          <Link href={'#features'}>Features</Link>
          <Link href={'#pricing'}>Pricing</Link>
        </div>
        <div className="flex flex-row"></div>
      </nav>
    </div>
  );
}
