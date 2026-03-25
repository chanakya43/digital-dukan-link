import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, Share2, Store, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/api";
import { toast } from "sonner";

const fetchProduct = async (productId: string) => {
  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const fetchVendorById = async (vendorId: string) => {
  const { data, error } = await db
    .from("vendors")
    .select("*")
    .eq("id", vendorId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });

  const { data: vendor } = useQuery({
    queryKey: ["vendor-by-id", product?.vendor_id],
    queryFn: () => fetchVendorById(product!.vendor_id),
    enabled: !!product?.vendor_id,
  });

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product?.product_name, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copy ho gaya!");
    }
  };

  const handleWhatsApp = () => {
    if (!vendor) return;
    const msg = encodeURIComponent(
      `Hi, I'm interested in "${product?.product_name}" (₹${product?.price?.toLocaleString("en-IN")}). Is it available?`
    );
    window.open(`https://wa.me/91${vendor.phone_number}?text=${msg}`, "_blank");
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Store className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="font-heading font-bold text-xl">Product nahi mila 😕</h1>
        <p className="text-muted-foreground text-sm mt-1 mb-4">
          Yeh product link galat hai ya product hat chuka hai.
        </p>
        <Link to="/" className="text-primary font-semibold text-sm hover:underline">
          ← Wapas Home Jayein
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg text-primary-foreground truncate flex-1">
            Product Details
          </h1>
          <button onClick={handleShare} className="text-primary-foreground hover:opacity-80">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Product Image */}
      <div className="w-full bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full max-h-[400px] object-contain mx-auto"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="container px-4 py-5 space-y-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">
            {product.product_name}
          </h2>
          <p className="text-2xl font-bold text-primary mt-1">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>

        {product.description && (
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-sm text-foreground mb-1">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* Vendor Info */}
        {vendor && (
          <Link
            to={`/shop/${vendor.username}`}
            className="flex items-center gap-3 bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading font-semibold text-sm text-foreground truncate">
                {vendor.shop_name}
              </p>
              <p className="text-xs text-muted-foreground">Dukan dekhen →</p>
            </div>
          </Link>
        )}
      </div>

      {/* Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-3 z-50">
        <div className="container flex gap-2">
          {vendor && (
            <>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button className="flex-1 gap-2" asChild>
                <a href={`tel:${vendor.phone_number}`}>
                  <Phone className="w-4 h-4" />
                  Call Karein
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
