import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertTriangle, Map, Users, TreePine } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e8] to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200"
          alt="African landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d4a2b]/85 to-[#3a5a38]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="mb-6">Protecting Our Environment, One Tree at a Time</h1>
            <p className="text-xl mb-8 text-[#f5f0e8]">
              Join the community effort to combat Prosopis juliflora invasion and restore our ecosystems, 
              honoring the legacy of Wangari Maathai
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate("map")} className="bg-white text-[#2d4a2b] hover:bg-[#f5f0e8]">
                <Map className="w-5 h-5 mr-2" />
                Explore Map
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("report")} className="border-white text-white hover:bg-white/10">
                Report Infestation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[#2d4a2b] mb-4">Our Mission</h2>
          <p className="text-lg text-stone-700 max-w-3xl mx-auto">
            Inspired by Nobel laureate Wangari Maathai's vision of environmental conservation, 
            Ecosiren empowers communities to identify, report, and eradicate invasive Prosopis juliflora 
            (Mathenge), while promoting the restoration of native ecosystems through tree planting initiatives.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-stone-200">
            <div className="w-16 h-16 bg-[#f4d7c3] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[#a0522d]" />
            </div>
            <h3 className="mb-2 text-stone-900">Track Infestations</h3>
            <p className="text-stone-600">
              Monitor Prosopis juliflora spread with real-time mapping and community reports
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-stone-200">
            <div className="w-16 h-16 bg-[#e8f1e8] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#2d4a2b]" />
            </div>
            <h3 className="mb-2 text-stone-900">Community Action</h3>
            <p className="text-stone-600">
              Unite communities to take collective action against invasive species
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-stone-200">
            <div className="w-16 h-16 bg-[#e8f1e8] rounded-full flex items-center justify-center mx-auto mb-4">
              <TreePine className="w-8 h-8 text-[#3a5a38]" />
            </div>
            <h3 className="mb-2 text-stone-900">Restore Ecosystems</h3>
            <p className="text-stone-600">
              Identify safe zones for native tree planting and ecosystem restoration
            </p>
          </Card>
        </div>

        {/* Quote Section */}
        <div className="bg-[#ebe6dd] rounded-lg p-8 border-l-4 border-[#2d4a2b]">
          <blockquote className="text-lg text-[#2d4a2b] italic mb-2">
            "In the course of history, there comes a time when humanity is called to shift to a new level of consciousness, 
            to reach a higher moral ground. A time when we have to shed our fear and give hope to each other. 
            That time is now."
          </blockquote>
          <p className="text-[#3a5a38]">— Wangari Maathai, Nobel Peace Prize Laureate</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2d4a2b] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-[#f5f0e8]">
            Your reports help protect our communities and restore our environment
          </p>
          <Button size="lg" onClick={() => onNavigate("report")} className="bg-white text-[#2d4a2b] hover:bg-[#f5f0e8]">
            Submit a Report
          </Button>
        </div>
      </div>
    </div>
  );
}