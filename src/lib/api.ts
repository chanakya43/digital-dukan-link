import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Untyped client to avoid build errors before migration types are generated
const db = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { storage: localStorage, persistSession: true, autoRefreshToken: true },
});

export { db };

// Re-export the typed client for auth operations
export { supabase } from "@/integrations/supabase/client";

// Vendor queries
export const fetchAllVendors = async () => {
  const { data: vendors, error } = await db
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const vendorsWithProducts = await Promise.all(
    (vendors || []).map(async (vendor: any) => {
      const { data: products } = await db
        .from("products")
        .select("image_url, product_name")
        .eq("vendor_id", vendor.id)
        .limit(3);
      return { ...vendor, products: products || [] };
    })
  );

  return vendorsWithProducts;
};

export const fetchVendorByUsername = async (username: string) => {
  const { data, error } = await db
    .from("vendors")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const fetchProductsByVendorId = async (vendorId: string) => {
  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchVendorByUserId = async (userId: string) => {
  const { data, error } = await db
    .from("vendors")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Auth
export const signUpVendor = async (
  password: string,
  shopName: string,
  username: string,
  phoneNumber: string
) => {
  const fakeEmail = `${username}@digitalvyapari.app`;

  const { data: authData, error: authError } = await db.auth.signUp({
    email: fakeEmail,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("Signup failed");

  const { error: vendorError } = await db.from("vendors").insert({
    user_id: authData.user.id,
    shop_name: shopName,
    username,
    phone_number: phoneNumber,
  });

  if (vendorError) throw vendorError;

  return authData;
};

export const loginVendor = async (username: string, password: string) => {
  const fakeEmail = `${username}@digitalvyapari.app`;
  const { data, error } = await db.auth.signInWithPassword({
    email: fakeEmail,
    password,
  });

  if (error) throw error;
  return data;
};

export const logoutVendor = async () => {
  await db.auth.signOut();
};

// Products CRUD
export const addProduct = async (vendorId: string, product: {
  product_name: string;
  price: number;
  description?: string;
  image_url?: string;
}) => {
  const { data, error } = await db
    .from("products")
    .insert({ vendor_id: vendorId, ...product })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (productId: string, updates: {
  product_name?: string;
  price?: number;
  description?: string;
  image_url?: string;
}) => {
  const { error } = await db
    .from("products")
    .update(updates)
    .eq("id", productId);

  if (error) throw error;
};

export const deleteProduct = async (productId: string) => {
  const { error } = await db
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;
};

// Image upload
export const uploadProductImage = async (userId: string, file: File) => {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error } = await db.storage
    .from("product-images")
    .upload(path, file);

  if (error) throw error;

  const { data } = db.storage
    .from("product-images")
    .getPublicUrl(path);

  return data.publicUrl;
};
