import CanvasBody from "@/components/canvas/CanvasBody";
import ModifySidebar from "@/components/modifySidebar/ModifySidebar";
import SidebarBody from "@/components/sidebar/SidebarBody";
import Header from "@/components/Header";

export default function Home() {
  return (
   <div className="w-full h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <Header />
    
    {/* Main Content */}
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 overflow-hidden">
      <SidebarBody />
      <CanvasBody />
      <ModifySidebar />
    </div>
   </div>
  );
}
