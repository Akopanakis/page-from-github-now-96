import React from "react";
import { Heart, Code, Fish } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* KostoPro Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Fish className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-800">KostoPro</span>
            </div>
            <p className="text-gray-600 text-sm">
              Επαγγελματική κοστολόγηση θαλασσινών με προχωρημένες δυνατότητες
              ανάλυσης
            </p>
          </div>

          {/* Creator Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-gray-800">Δημιουργός</span>
            </div>
            <p className="text-gray-700 font-medium">Alexandros Kopanakis</p>
            <p className="text-gray-500 text-sm mt-1">Σχεδιασμός & Ανάπτυξη</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-1 mb-2">
              <span className="text-gray-600">Φτιαγμένο με</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-gray-600">
                για τη βιομηχανία θαλασσινών
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} KostoPro. Όλα τα δικαιώματα
              διατηρούνται.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Version 2.0.0 | Made in Greece 🇬🇷
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>PWA Ready</span>
              <span>•</span>
              <span>Offline Support</span>
              <span>•</span>
              <span>Mobile Optimized</span>
            </div>
            <div className="text-xs text-gray-400">
              Χρησιμοποιώντας την εφαρμογή αποδέχεστε τους όρους χρήσης
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
