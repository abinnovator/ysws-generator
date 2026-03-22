import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user =await auth()
  console.log(user)
  return (
    <div className="bg-[#fef7ef] h-screen px-12 py-7 font-[family-name:var(--font-satoshi)]">
      <nav className="flex flex-row px-4 pb-4 justify-between ">
        <h1>Ysws gen</h1>
        <div className="justify-center items-center flex flex-row gap-4 text-[#3b2314]">
          <Link href={'#features'}>Features</Link>
          <Link href={'#pricing'}>Pricing</Link>
        </div>
        {!user.isAuthenticated ?
        (<Link href={'/sign-up'}><Button className="bg-[#338eda] px-10 py-7 rounded-full cursor-pointer"><span className="px-2 py-4">Start Now</span></Button></Link>):
        (<Link href={'/dashboard'}><Button className="bg-[#338eda] px-10 py-7 rounded-full cursor-pointer"><span className="px-2 py-4">Dashboard</span></Button></Link>) }
        
        
      </nav>
      <div className="flex flex-col items-center justify-center pt-30 gap-9">
        <h1 className="text-[#3b2517] font-black text-7xl text-center">Make your own ysws in <br /> <span className="text-[#e85464]">less than 10 minutes!</span></h1>
        <p>Get your ysws into production in just a few minutes with my platform:)</p>
      </div>

      <div className="flex flex-row gap-10 items-center justify-center pt-10">
        {!user.isAuthenticated ?
        (<Link href={'/sign-up'}><Button className="bg-[#338eda] px-10 py-7 rounded-full cursor-pointer"><span className="px-2 py-4">Start Now</span></Button></Link>):
        (<Link href={'/dashboard'}><Button className="bg-[#338eda] px-10 py-7 rounded-full cursor-pointer"><span className="px-2 py-4">Dashboard</span></Button></Link>) }
        <Button className="border-2 border-gray-400 px-10 py-7 rounded-full cursor-pointer">Learn more</Button>
      </div>
    </div>
  );
}
