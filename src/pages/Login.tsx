import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with Supabase auth
    await new Promise((r) => setTimeout(r, 600));

    // Mock: accept any login for now
    toast.success("Login ho gaya!");
    navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="container flex items-center gap-3">
          <Link to="/" className="text-primary-foreground hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-bold text-lg text-primary-foreground">
            Vyapari Login
          </h1>
        </div>
      </header>

      <div className="px-4 py-10">
        <div className="container max-w-sm mx-auto">
          <div className="text-center mb-8 opacity-0 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              Apni Dukan Manage Karein
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Apna username aur password daalo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Username
              </label>
              <input
                type="text"
                required
                maxLength={30}
                placeholder="Apna username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Apna password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {loading ? "Login Ho Raha Hai..." : "Login Karein"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Naya Vyapari ho?{" "}
              <Link to="/create-shop" className="text-primary font-semibold hover:underline">
                Dukan Banayein
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
