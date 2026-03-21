interface ProductCardProps {
  product: {
    id: string;
    product_name: string;
    price: number;
    description?: string;
    image_url: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h4 className="font-heading font-semibold text-sm text-foreground truncate">
          {product.product_name}
        </h4>
        {product.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="mt-1.5 font-bold text-primary text-lg">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
