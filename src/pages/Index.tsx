import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import VendorCard from "@/components/VendorCard";
import BottomNav from "@/components/BottomNav";

// Mock data for now — will be replaced with Supabase queries
const mockVendors = [
  {
    id: "1",
    shop_name: "Sharma Ji Ki Dukan",
    username: "sharmaji",
    phone_number: "+91 98765 43210",
    products: [
      { image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop", product_name: "Masale" },
      { image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop", product_name: "Chai" },
      { image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop", product_name: "Atta" },
    ],
  },
  {
    id: "2",
    shop_name: "Gupta Vastra Bhandar",
    username: "guptaji",
    phone_number: "+91 87654 32109",
    products: [
      { image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop", product_name: "Saree" },
      { image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop", product_name: "Kurta" },
    ],
  },
  {
    id: "3",
    shop_name: "Patel Electronics",
    username: "patelbhai",
    phone_number: "+91 76543 21098",
    products: [
      { image_url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop", product_name: "Mobile" },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
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

      {/* Hero */}
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

      {/* Vendor Grid */}
      <section className="px-4">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVendors.map((vendor, i) => (
            <div
              key={vendor.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <VendorCard vendor={vendor} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA for vendors */}
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

export default Index;
