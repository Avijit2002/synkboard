import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <SignUp />
    </div>
  );
};

export default page;
