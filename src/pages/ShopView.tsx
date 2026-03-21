import { useParams, Link } from "react-router-dom";
import { Phone, Store, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const mockShopData: Record<string, {
  shop_name: string;
  phone_number: string;
  products: { id: string; product_name: string; price: number; description?: string; image_url: string }[];
}> = {
  sharmaji: {
    shop_name: "Sharma Ji Ki Dukan",
    phone_number: "+91 98765 43210",
    products: [
      { id: "1", product_name: "Garam Masala", price: 120, description: "Pure ghar jaisa masala", image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop" },
      { id: "2", product_name: "Assam Chai Patti", price: 250, description: "Kadak chai ke liye", image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop" },
      { id: "3", product_name: "Shudh Atta 5kg", price: 340, image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" },
      { id: "4", product_name: "Sarson Ka Tel", price: 180, description: "Cold pressed", image_url: "https://images.unsplash.com/photo-1474979266404-7f28db3f3769?w=400&h=400&fit=crop" },
    ],
  },
  guptaji: {
    shop_name: "Gupta Vastra Bhandar",
    phone_number: "+91 87654 32109",
    products: [
      { id: "5", product_name: "Banarasi Saree", price: 2500, description: "Handloom silk", image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop" },
      { id: "6", product_name: "Cotton Kurta", price: 799, image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop" },
    ],
  },
  patelbhai: {
    shop_name: "Patel Electronics",
    phone_number: "+91 76543 21098",
    products: [
      { id: "7", product_name: "Wireless Earbuds", price: 1299, description: "Bluetooth 5.0", image_url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop" },
    ],
  },
};

const ShopView = () => {
  const { username } = useParams<{ username: string }>();
  const shop = username ? mockShopData[username] : null;

  if (!shop) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Store className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="font-heading font-bold text-xl">Dukan nahi mili 😕</h1>
        <p className="text-muted-foreground text-sm mt-1 mb-4">
          Yeh shop link galat hai ya dukan abhi band hai.
        </p>
        <Link to="/" className="text-primary font-semibold text-sm hover:underline">
          ← Wapas Home Jayein
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <Link to="/" className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading font-bold text-lg text-primary-foreground truncate">
              {shop.shop_name}
            </h1>
          </div>
          <a
            href={`tel:${shop.phone_number}`}
            className="flex items-center gap-1.5 bg-green-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
        </div>
      </header>

      {/* Contact bar */}
      <div className="bg-card border-b px-4 py-2.5">
        <div className="container flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-green-accent" />
          <a href={`tel:${shop.phone_number}`} className="text-foreground font-medium hover:underline">
            {shop.phone_number}
          </a>
          <span className="text-muted-foreground text-xs">— Call karein order ke liye</span>
        </div>
      </div>

      {/* Products */}
      <section className="px-4 py-5">
        <div className="container">
          <h2 className="font-heading font-bold text-lg text-foreground mb-4">
            Saare Products ({shop.products.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {shop.products.map((product, i) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopView;
