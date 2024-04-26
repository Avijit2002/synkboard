import NavBar from "./_components/NavBar";
import OrgNav from "./_components/OrgNav";
import SideNav from "./_components/SideNav";

interface DashboardlayoutProps {
  children: React.ReactNode;
}

const Dashboardlayout = ({ children }: DashboardlayoutProps) => {
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
