import Image from "next/image";
import { logo2 } from "../../../public/svgExport";

function Loader() {
  return (
    <div className="h-screen w-screen grid place-items-center ">
      <Image src={logo2} alt="Logo" height={320} width={320} className="animate-ping duration-700" />
    </div>
  );
}

export default Loader;
