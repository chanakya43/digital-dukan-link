import { useParams, Link } from "react-router-dom";
import { Phone, Store, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { fetchVendorByUsername, fetchProductsByVendorId } from "@/lib/api";

const ShopView = () => {
  const { username } = useParams<{ username: string }>();

  const { data: vendor, isLoading: vendorLoading } = useQuery({
    queryKey: ["vendor", username],
    queryFn: () => fetchVendorByUsername(username!),
    enabled: !!username,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", vendor?.id],
    queryFn: () => fetchProductsByVendorId(vendor!.id),
    enabled: !!vendor?.id,
  });

  if (vendorLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!vendor) {
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
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <Link to="/" className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading font-bold text-lg text-primary-foreground truncate">
              {vendor.shop_name}
            </h1>
          </div>
          <a
            href={`tel:${vendor.phone_number}`}
            className="flex items-center gap-1.5 bg-green-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
        </div>
      </header>

      <div className="bg-card border-b px-4 py-2.5">
        <div className="container flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-green-accent" />
          <a href={`tel:${vendor.phone_number}`} className="text-foreground font-medium hover:underline">
            {vendor.phone_number}
          </a>
          <span className="text-muted-foreground text-xs">— Call karein order ke liye</span>
        </div>
      </div>

      <section className="px-4 py-5">
        <div className="container">
          <h2 className="font-heading font-bold text-lg text-foreground mb-4">
            Saare Products ({products.length})
          </h2>
          {productsLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg border animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-5 bg-muted rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product: any, i: number) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">Abhi koi product nahi hai</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopView;
