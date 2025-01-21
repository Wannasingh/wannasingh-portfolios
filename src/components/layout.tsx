import Header from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1E1E1E]">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
