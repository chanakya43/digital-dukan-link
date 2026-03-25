import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VendorCard from "@/components/VendorCard";
import BottomNav from "@/components/BottomNav";
import { fetchAllVendors } from "@/lib/api";

const Shops = () => {
  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchAllVendors,
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-2">
          <Store className="w-7 h-7 text-primary-foreground" />
          <div>
            <h1 className="font-heading font-bold text-lg text-primary-foreground leading-tight">
              Digital Vyapari
            </h1>
            <p className="text-xs text-primary-foreground/80">
              Apni Dukan, Digital Duniya
            </p>
          </div>
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="container">
          <h2 className="font-heading font-bold text-xl text-foreground text-balance">
            Sabhi Dukanein 🏪
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Apne area ki sabhi dukano ko yahan browse karein
          </p>
        </div>
      </section>

      <section className="px-4">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
                <div className="h-9 bg-muted rounded" />
              </div>
            ))
          ) : vendors.length > 0 ? (
            vendors.map((vendor: any, i: number) => (
              <div
                key={vendor.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <VendorCard vendor={vendor} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Abhi koi dukan register nahi hui</p>
              <p className="text-xs text-muted-foreground mt-1">Pehle vyapari banein!</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="container">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-5 text-center">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Kya aap bhi Vyapari hain? 🙋‍♂️
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Apni dukan digital banayein — bilkul FREE!
            </p>
            <Link
              to="/create-shop"
              className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Apni Dukan Banayein
            </Link>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Shops;
