
-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  shop_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  product_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read for vendors
CREATE POLICY "Anyone can view vendors" ON public.vendors FOR SELECT USING (true);

-- Vendor can insert their own row
CREATE POLICY "Users can insert own vendor" ON public.vendors FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Vendor can update own row
CREATE POLICY "Users can update own vendor" ON public.vendors FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Public read for products
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Vendor can manage own products
CREATE POLICY "Vendors can insert products" ON public.products FOR INSERT TO authenticated
  WITH CHECK (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));

CREATE POLICY "Vendors can update products" ON public.products FOR UPDATE TO authenticated
  USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));

CREATE POLICY "Vendors can delete products" ON public.products FOR DELETE TO authenticated
  USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));
