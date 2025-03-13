import Login from "@/Components/Login";
import { images } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center pb-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image className="mx-auto h-36 w-auto" src={images.Logo} alt="" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
      </div>
      <Login />
    </div>
  );
}
