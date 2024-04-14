import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <SignIn />
    </div>
  );
};

export default page;
