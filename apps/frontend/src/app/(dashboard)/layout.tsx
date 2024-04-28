import NavBar from "./_components/NavBar";
import OrgNav from "./_components/OrgNav";
import SideNav from "./_components/SideNav";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

interface DashboardlayoutProps {
  children: React.ReactNode;
}

const Dashboardlayout = ({ children }: DashboardlayoutProps) => {
  const queryClient = new QueryClient();

  return (
      <main className="h-screen">
        <SideNav />
        <div className="pl-20 h-full">
          <div className="flex h-full">
            <OrgNav />
            <div className="w-full">
              <NavBar />
              {children}
            </div>
          </div>
        </div>
      </main>
  );
};

export default Dashboardlayout;
