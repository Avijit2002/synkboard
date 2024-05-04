import Image from "next/image";
import { logo2 } from "../../../public/svgExport";

function Loader() {
  return (
    <div className="h-full w-full grid place-items-center ">
      <Image src={logo2} alt="Logo" height={320} width={320} className="animate-ping duration-1000" />
    </div>
  );
}

export default Loader;
