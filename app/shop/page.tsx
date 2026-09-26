import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <header className="border-b border-[#C9A24B]/20 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl text-[#F5F1E8] tracking-wider">
            SCENTLAAB
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#B8B2A7] hover:text-[#C9A24B] transition-colors">
              Beranda
            </Link>
            <Link href="/shop" className="text-[#C9A24B]">
              Toko
            </Link>
            <Link href="/cart" className="text-[#B8B2A7] hover:text-[#C9A24B] transition-colors">
              Keranjang
            </Link>
          </nav>
        </div>
      </header>

      {/* Shop Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[#F5F1E8] mb-4">
              Koleksi Parfum
            </h1>
            <div className="w-24 h-px bg-[#C9A24B] mx-auto mb-6"></div>
            <p className="text-[#B8B2A7] text-lg">
              Temukan aroma yang mencerminkan kepribadian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/shop/${product.slug}`}
                className="group"
              >
                <div className="bg-[#141414] border border-[#C9A24B]/20 overflow-hidden transition-all duration-300 hover:border-[#C9A24B] hover:shadow-lg hover:shadow-[#C9A24B]/10">
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#F5F1E8] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#C9A24B] text-sm mb-3 tracking-wide">
                      {product.character}
                    </p>
                    <p className="text-[#B8B2A7] text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F1E8] font-semibold text-lg">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[#C9A24B] text-sm group-hover:underline">
                        Lihat Detail →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#C9A24B]/20 py-8 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#B8B2A7] text-sm">
            © 2026 Scentlaab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
