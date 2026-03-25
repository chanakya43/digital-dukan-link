import { Home, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { pathname } = useLocation();

  const tabs = [
    { to: "/shops", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t safe-area-pb">
      <div className="flex">
        {tabs.map((tab) => {
          const active = pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
