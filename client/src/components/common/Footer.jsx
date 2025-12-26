export default function Footer() {
  return (
    <footer className="bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Row: Logo (left) + Social Icons (right) */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white text-sm font-bold">
              ◆
            </div>
            <span className="font-semibold text-gray-800">
              Intuition
            </span>
          </div>

          <div className="flex gap-4 text-gray-500 text-lg">
            <span className="cursor-pointer hover:text-emerald-600">𝕏</span>
            <span className="cursor-pointer hover:text-emerald-600">f</span>
            <span className="cursor-pointer hover:text-emerald-600">◎</span>
            <span className="cursor-pointer hover:text-emerald-600">in</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-100 mb-10" />

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm text-gray-600">
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">About Us</li>
              <li className="hover:text-emerald-600 cursor-pointer">Careers</li>
              <li className="hover:text-emerald-600 cursor-pointer">Blog</li>
              <li className="hover:text-emerald-600 cursor-pointer">Press</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-3">Product</h4>
            <ul className="space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">Features</li>
              <li className="hover:text-emerald-600 cursor-pointer">Integrations</li>
              <li className="hover:text-emerald-600 cursor-pointer">Pricing</li>
              <li className="hover:text-emerald-600 cursor-pointer">API</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">Help Center</li>
              <li className="hover:text-emerald-600 cursor-pointer">Tutorials</li>
              <li className="hover:text-emerald-600 cursor-pointer">Developers</li>
              <li className="hover:text-emerald-600 cursor-pointer">Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-emerald-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-emerald-600 cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 text-sm text-gray-500">
          © 2025 Intuition. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
