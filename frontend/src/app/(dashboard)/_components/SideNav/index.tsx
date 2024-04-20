import List from "./List";
import NewButton from "./NewButton";


const SideNav = () => {
  return (
    <aside className="h-screen fixed bg-color-p w-20 z-10 left-0 flex flex-col p-3 text-center space-y-3">
      <List />
      <NewButton />
    </aside>
  );
};

export default SideNav;
