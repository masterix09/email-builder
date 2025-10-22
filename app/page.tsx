import CanvasBody from "@/components/canvas/CanvasBody";
import ModifySidebar from "@/components/modifySidebar/ModifySidebar";
import SidebarBody from "@/components/sidebar/SidebarBody";

export default function Home() {
  return (
   <div className="w-full grid grid-cols-1 lg:grid-cols-6 bg-white h-screen">
    <SidebarBody />
    <CanvasBody />
    <ModifySidebar />
   </div>
  );
}
