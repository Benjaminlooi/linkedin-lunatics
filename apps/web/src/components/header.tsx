import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo / Brand Name */}
        <div className="text-xl font-semibold">LinkedIn Lunatics</div>

        {/* Navigation */}
        {/* <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav> */}

        {/* CTA Button */}
        <Button variant="link" asChild>
          <a href="https://benjaminlooi.dev">Benjamin Looi</a>
        </Button>
      </div>
    </header>
  );
}
