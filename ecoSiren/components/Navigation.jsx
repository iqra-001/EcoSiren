import { Leaf, Map, FileText, Info } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home", icon: Leaf },
    { id: "map", label: "Map", icon: Map },
    { id: "report", label: "Report", icon: FileText },
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
          
          <