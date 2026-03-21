import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copy, Check, Plus, Pencil, Trash2, LogOut, Store, ImagePlus, Camera } from "lucide-react";
import { toast } from "sonner";
import { db, logoutVendor, fetchVendorByUserId, fetchProductsByVendorId, addProduct, updateProduct, deleteProduct as deleteProductApi, uploadProductImage } from "@/lib/api";

interface Product {
  id: string;
  product_name: string;
  price: number;
  description: string;
  image_url: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ product_name: "", price: "", description: "", image_url: "" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await db.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      try {
        const v = await fetchVendorByUserId(session.user.id);
        if (!v) { navigate("/login"); return; }
        setVendor(v);
        const prods = await fetchProductsByVendorId(v.id);
        setProducts(prods);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  const shopLink = vendor ? `${window.location.origin}/shop/${vendor.username}` : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shopLink);
    setCopied(true);
    toast.success("Link copy ho gaya!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data: { session } } = await db.auth.getSession();
      if (!session) return;
      const url = await uploadProductImage(session.user.id, file);
      setForm((p) => ({ ...p, image_url: url }));
      toast.success("Photo upload ho gayi!");
    } catch (err: any) {
      toast.error("Photo upload nahi ho payi: " + (err.message || ""));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product_name || !form.price) {
      toast.error("Product ka naam aur price zaruri hai!");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await updateProduct(editId, {
          product_name: form.product_name,
          price: Number(form.price),
          description: form.description || undefined,
          image_url: form.image_url || undefined,
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === editId ? { ...p, product_name: form.product_name, price: Number(form.price), description: form.description, image_url: form.image_url } : p))
        );
        toast.success("Product update ho gaya!");
      } else {
        const newProd = await addProduct(vendor.id, {
          product_name: form.product_name,
          price: Number(form.price),
          description: form.description || undefined,
          image_url: form.image_url || undefined,
        });
        setProducts((prev) => [newProd, ...prev]);
        toast.success("Naya product add ho gaya! 🎉");
      }
      setForm({ product_name: "", price: "", description: "", image_url: "" });
      setShowForm(false);
      setEditId(null);
    } catch (err: any) {
      toast.error(err.message || "Kuch galat ho gaya");
    } finally {
      setSaving(false);
    }
  };

  const editProduct = (p: Product) => {
    setForm({ product_name: p.product_name, price: String(p.price), description: p.description || "", image_url: p.image_url || "" });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProductApi(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product hata diya gaya");
    } catch (err: any) {
      toast.error(err.message || "Delete nahi ho paya");
    }
  };

  const handleLogout = async () => {
    await logoutVendor();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-primary-foreground" />
            <h1 className="font-heading font-bold text-lg text-primary-foreground">
              {vendor?.shop_name || "Meri Dukan"}
            </h1>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground">
            <LogOut className="w-4 h-4" /> Logout
          </button>
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
            <button onClick={copyLink}
              className="flex-shrink-0 p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.95] transition-all">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Add product */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-foreground">Products ({products.length})</h2>
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm({ product_name: "", price: "", description: "", image_url: "" }); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-green-accent text-accent-foreground text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-all">
              <Plus className="w-4 h-4" /> Product Add Karein
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <form onSubmit={handleSave} className="bg-card border rounded-lg p-4 mb-4 space-y-3 opacity-0 animate-scale-in">
              <h3 className="font-heading font-bold text-sm text-foreground">
                {editId ? "Product Edit Karein" : "Naya Product"}
              </h3>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Product Photo</label>
                <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-medium text-foreground hover:bg-muted active:scale-[0.97] transition-all disabled:opacity-50">
                    <Camera className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Photo Choose Karein"}
                  </button>
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
                <input type="text" required maxLength={100} placeholder="e.g. Garam Masala"
                  value={form.product_name} onChange={(e) => setForm((p) => ({ ...p, product_name: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Price (₹) *</label>
                <input type="number" required min="0" placeholder="e.g. 120"
                  value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Description (optional)</label>
                <input type="text" maxLength={200} placeholder="Chhota sa description"
                  value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-md border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>

              <div className="flex gap-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50">
                  {saving ? "Saving..." : editId ? "Save Karein" : "Add Karein"}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}
                  className="px-4 py-2 rounded-md border text-foreground text-xs font-medium hover:bg-muted active:scale-[0.97] transition-all">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Product list */}
          <div className="space-y-3">
            {products.map((product, i) => (
              <div key={product.id}
                className="bg-card border rounded-lg p-3 flex gap-3 items-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{product.product_name}</h4>
                  {product.description && <p className="text-xs text-muted-foreground truncate">{product.description}</p>}
                  <p className="font-bold text-primary text-sm mt-0.5">₹{Number(product.price).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => editProduct(product)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground active:scale-[0.95] transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive active:scale-[0.95] transition-all">
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
