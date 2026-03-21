import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, ArrowLeft, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import BottomNav from "@/components/BottomNav";
import { fetchAllVendors } from "@/lib/api";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { data: vendors = [] } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchAllVendors,
  });

  const filtered = (vendors as any[]).filter(
    (v) =>
      v.shop_name.toLowerCase().includes(query.toLowerCase()) ||
      v.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <Link to="/" className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-bold text-lg text-primary-foreground">Dukan Khojein</h1>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="container max-w-lg">
          <div className="relative mb-5">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" autoFocus placeholder="Dukan ka naam ya username..."
              value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="space-y-2">
            {filtered.map((v: any) => (
              <Link key={v.id} to={`/shop/${v.username}`}
                className="flex items-center gap-3 bg-card border rounded-lg p-3 hover:shadow-sm active:scale-[0.98] transition-all">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Store className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{v.shop_name}</p>
                  <p className="text-xs text-muted-foreground">@{v.username}</p>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && query && (
              <p className="text-center text-sm text-muted-foreground py-8">
                Koi dukan nahi mili "{query}" ke liye 😕
              </p>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
