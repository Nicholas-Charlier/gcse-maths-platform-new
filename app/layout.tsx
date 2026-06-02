import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import { createClient } from "@/app/lib/supabase/server";
import { UserProvider } from "@/app/lib/context/UserContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  let firstName: string | null = null;
  let subscriptionTier: string | null = null;

  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, subscription_tier")
      .eq("id", session.user.id)
      .single();

    firstName = profile?.first_name ?? null;
    subscriptionTier = profile?.subscription_tier ?? "free";
  }

  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <UserProvider value={{ firstName, subscriptionTier }}>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}