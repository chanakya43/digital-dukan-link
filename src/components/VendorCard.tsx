import { Phone, Store, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Vendor {
  id: string;
  shop_name: string;
  username: string;
  phone_number: string;
  products?: { image_url: string; product_name: string }[];
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const previews = vendor.products?.slice(0, 3) || [];

  return (
    <div className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-base text-foreground truncate">
              {vendor.shop_name}
            </h3>
            <a
              href={`tel:${vendor.phone_number}`}
              className="flex items-center gap-1 text-sm text-green-accent hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              {vendor.phone_number}
            </a>
          </div>
        </div>

        {previews.length > 0 && (
          <div className="flex gap-2 mb-3">
            {previews.map((p, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0"
              >
                <img
                  src={p.image_url}
                  alt={p.product_name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <Link
          to={`/shop/${vendor.username}`}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
        >
          <Eye className="w-4 h-4" />
          Dukan Dekho
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
