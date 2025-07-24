import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Login from "./auth/page";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">  
    <p>see dashboard if have problem in authentication due to any reason</p>
      <Link href="/dashboard"> <Button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 font-semibold w-32 mx-auto text-center"  >Dashboard</Button></Link>
      <Login />
      </div>
    </>
  );
}
