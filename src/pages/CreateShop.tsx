import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { signUpVendor } from "@/lib/api";

const CreateShop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shop_name: "",
    phone_number: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Password match nahi ho rahe!");
      return;
    }
    if (formData.username.length < 3) {
      toast.error("Username kam se kam 3 characters ka hona chahiye");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password kam se kam 6 characters ka hona chahiye");
      return;
    }

    setLoading(true);
    try {
      await signUpVendor(
        formData.password,
        formData.shop_name,
        formData.username,
        formData.phone_number
      );
      const link = `${window.location.origin}/shop/${formData.username}`;
      setCreatedLink(link);
      toast.success("Dukan ban gayi! 🎉");
    } catch (err: any) {
      toast.error(err.message || "Kuch galat ho gaya, dobara try karein");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      toast.success("Link copy ho gaya!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (createdLink) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center opacity-0 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-green-accent flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            Badhai Ho! 🎉
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Aapki digital dukan taiyar hai. Yeh link apne customers ko share karein:
          </p>
          <div className="bg-card border rounded-lg p-3 flex items-center gap-2 mb-6">
            <p className="text-sm font-medium text-foreground flex-1 text-left truncate">
              {createdLink}
            </p>
            <button
              onClick={copyLink}
              className="flex-shrink-0 p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.95] transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.97] transition-all text-center"
            >
              Dashboard Mein Login Karein
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Home Par Jayein
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <Link to="/" className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-bold text-lg text-primary-foreground">
            Apni Dukan Banayein
          </h1>
        </div>
      </header>

      <div className="px-4 py-6">
        <div className="container max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground">
                Nayi Dukan Create Karein
              </h2>
              <p className="text-xs text-muted-foreground">
                Sab free hai — bas details bharein!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Dukan Ka Naam</label>
              <input type="text" required maxLength={100} placeholder="e.g. Sharma General Store"
                value={formData.shop_name} onChange={(e) => setFormData((p) => ({ ...p, shop_name: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Mobile Number</label>
              <input type="tel" required maxLength={15} placeholder="+91 98765 43210"
                value={formData.phone_number} onChange={(e) => setFormData((p) => ({ ...p, phone_number: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Username (yeh aapka shop link banega)</label>
              <div className="flex items-center gap-0 border rounded-md overflow-hidden bg-card">
                <span className="bg-muted px-2.5 py-2.5 text-xs text-muted-foreground border-r whitespace-nowrap">/shop/</span>
                <input type="text" required maxLength={30} pattern="[a-z0-9_]+" placeholder="apna_username"
                  value={formData.username}
                  onChange={(e) => setFormData((p) => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") }))}
                  className="flex-1 px-2.5 py-2.5 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
              <input type="password" required minLength={6} placeholder="Kam se kam 6 characters"
                value={formData.password} onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Confirm Password</label>
              <input type="password" required minLength={6} placeholder="Wahi password dobara likho"
                value={formData.confirm_password} onChange={(e) => setFormData((p) => ({ ...p, confirm_password: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50">
              {loading ? "Dukan Ban Rahi Hai..." : "Dukan Create Karein 🚀"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Pehle se dukan hai?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Login Karein</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
