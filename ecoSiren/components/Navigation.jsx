import { Leaf, Map, Info } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home", icon: Leaf },
    { id: "map", label: "Map", icon: Map },
    { id: "impact", label: "Impact", icon: Info },
  ];

  return (
    <nav className="bg-white border-b border-stone-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2d4a2b] rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-[#f5f0e8]" />
            </div>
            <span className="text-[#2d4a2b]">Ecosiren</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="md:hidden flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}