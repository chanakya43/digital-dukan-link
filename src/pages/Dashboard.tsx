import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Plus, Pencil, Trash2, LogOut, Store, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  product_name: string;
  price: number;
  description: string;
  image_url: string;
}

const mockProducts: Product[] = [
  { id: "1", product_name: "Garam Masala", price: 120, description: "Pure ghar jaisa", image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop" },
  { id: "2", product_name: "Assam Chai", price: 250, description: "Kadak chai", image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" },
];

const Dashboard = () => {
  const shopLink = `${window.location.origin}/shop/sharmaji`;
  const [copied, setCopied] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ product_name: "", price: "", description: "", image_url: "" });

  const copyLink = () => {
    navigator.clipboard.writeText(shopLink);
    setCopied(true);
    toast.success("Link copy ho gaya!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product_name || !form.price) {
      toast.error("Product ka naam aur price zaruri hai!");
      return;
    }

    if (editId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form, price: Number(form.price) } : p))
      );
      toast.success("Product update ho gaya!");
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        product_name: form.product_name,
        price: Number(form.price),
        description: form.description,
        image_url: form.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Naya product add ho gaya! 🎉");
    }

    setForm({ product_name: "", price: "", description: "", image_url: "" });
    setShowForm(false);
    setEditId(null);
  };

  const editProduct = (p: Product) => {
    setForm({ product_name: p.product_name, price: String(p.price), description: p.description, image_url: p.image_url });
    setEditId(p.id);
    setShowForm(true);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product hata diya gaya");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-primary-foreground" />
            <h1 className="font-heading font-bold text-lg text-primary-foreground">
              Meri Dukan
            </h1>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="container max-w-lg">
          {/* Shop link */}
          <div className="bg-card border rounded-lg p-3 flex items-center gap-2 mb-6 opacity-0 animate-fade-up">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Aapka Shop Link:</p>
              <p className="text-sm font-medium text-foreground truncate">{shopLink}</p>
            </div>
            <button
              onClick={copyLink}
              className="flex-shrink-0 p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.95] transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Add product button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-foreground">
              Products ({products.length})
            </h2>
            <button
              onClick={() => {
                setShowForm(true);
                setEditId(null);
                setForm({ product_name: "", price: "", description: "", image_url: "" });
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-green-accent text-accent-foreground text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              <Plus className="w-4 h-4" />
              Product Add Karein
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <form onSubmit={handleSave} className="bg-card border rounded-lg p-4 mb-4 space-y-3 opacity-0 animate-scale-in">
              <h3 className="font-heading font-bold text-sm text-foreground">
                {editId ? "Product Edit Karein" : "Naya Product"}
              </h3>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Photo URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Image URL paste karein"
                    value={form.image_url}
                    onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                    className="flex-1 px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {form.image_url ? (
                      <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Product Naam *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g. Garam Masala"
                  value={form.product_name}
                  onChange={(e) => setForm((p) => ({ ...p, product_name: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 120"
                  value={form.price}
                  onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Description (optional)</label>
                <input
                  type="text"
                  maxLength={200}
                  placeholder="Chhota sa description"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 active:scale-[0.97] transition-all"
                >
                  {editId ? "Save Karein" : "Add Karein"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditId(null); }}
                  className="px-4 py-2 rounded-md border text-foreground text-xs font-medium hover:bg-muted active:scale-[0.97] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Product list */}
          <div className="space-y-3">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="bg-card border rounded-lg p-3 flex gap-3 items-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{product.product_name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                  <p className="font-bold text-primary text-sm mt-0.5">₹{product.price}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => editProduct(product)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground active:scale-[0.95] transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive active:scale-[0.95] transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground text-sm">Koi product nahi hai abhi</p>
                <p className="text-xs text-muted-foreground mt-1">Upar "Product Add Karein" button dabayein</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
