import { Store, ShoppingBag, Phone, ArrowRight, Smartphone, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Smartphone,
    title: "Digital Dukan",
    desc: "Apni poori dukan online le jaayein — sirf 2 minute mein setup!",
  },
  {
    icon: ShoppingBag,
    title: "Unlimited Products",
    desc: "Jitne chahein utne products add karein — koi limit nahi.",
  },
  {
    icon: Phone,
    title: "Direct Customer Contact",
    desc: "WhatsApp aur call se seedha customer se baat karein.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    desc: "Apne products ko zyada logon tak pohunchayein digitally.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Digital Vyapari
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/shops">Dukanein</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/create-shop">Dukan Banayein</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container relative py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6 animate-fade-up">
            <Users className="w-4 h-4" />
            100% Free — Koi charges nahi!
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground leading-tight max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
            Apni Dukan Ko <span className="text-primary">Digital</span> Banayein
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Sirf 2 minute mein apni online dukan banayein, products add karein, aur customers ko directly connect karein.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="text-base px-8 gap-2" asChild>
              <Link to="/create-shop">
                Abhi Shuru Karein
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link to="/shops">Dukanein Dekhein</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
            {[
              { num: "100%", label: "Free" },
              { num: "2 min", label: "Setup" },
              { num: "∞", label: "Products" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-2xl md:text-3xl text-primary">{s.num}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            Kyun Chunein Digital Vyapari? 🤔
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card rounded-xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 100 + 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            Kaise Kaam Karta Hai? 🚀
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "1", title: "Register Karein", desc: "Apna shop name, username aur phone number daalein." },
              { step: "2", title: "Products Add Karein", desc: "Photo, price aur description ke saath products upload karein." },
              { step: "3", title: "Share Karein", desc: "Apni dukan ka link WhatsApp, Instagram pe share karein!" },
            ].map((s, i) => (
              <div key={s.step} className="text-center opacity-0 animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary to-saffron-light rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-2">
              Tayaar Hain? Abhi Shuru Karein! 🎉
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Apni dukan digital banayein — bilkul FREE, koi hidden charges nahi.
            </p>
            <Button size="lg" variant="secondary" className="text-base px-8 gap-2 font-bold" asChild>
              <Link to="/create-shop">
                Apni Dukan Banayein
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Store className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-foreground">Digital Vyapari</span>
          </div>
          <p className="text-sm text-muted-foreground">Apni Dukan, Digital Duniya 🇮🇳</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
