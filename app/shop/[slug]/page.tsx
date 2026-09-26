import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = `Halo, saya tertarik dengan ${product.name} (Rp ${product.price.toLocaleString('id-ID')}). Bisa info lebih lanjut?`;
  const whatsappUrl = `https://wa.me/6288175225580?text=${encodeURIComponent(whatsappMessage)}`;

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
            <Link href="/shop" className="text-[#B8B2A7] hover:text-[#C9A24B] transition-colors">
              Toko
            </Link>
            <Link href="/cart" className="text-[#B8B2A7] hover:text-[#C9A24B] transition-colors">
              Keranjang
            </Link>
          </nav>
        </div>
      </header>

      {/* Product Detail */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="relative h-80 md:h-[500px] lg:h-[600px] bg-[#141414] border border-[#C9A24B]/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#F5F1E8] mb-4">
                {product.name}
              </h1>
              <p className="text-[#C9A24B] text-base md:text-lg mb-6 tracking-wide">
                {product.character}
              </p>
              <p className="text-xl md:text-2xl text-[#F5F1E8] font-semibold mb-8">
                Rp {product.price.toLocaleString('id-ID')}
              </p>

              <div className="mb-8">
                <h3 className="text-[#F5F1E8] font-semibold mb-2">Deskripsi</h3>
                <p className="text-[#B8B2A7] text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-[#F5F1E8] font-semibold mb-3">Fragrance Notes</h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex">
                    <span className="text-[#C9A24B] w-20 md:w-24 flex-shrink-0">Top:</span>
                    <span className="text-[#B8B2A7]">{product.notes.top}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#C9A24B] w-20 md:w-24 flex-shrink-0">Middle:</span>
                    <span className="text-[#B8B2A7]">{product.notes.middle}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#C9A24B] w-20 md:w-24 flex-shrink-0">Base:</span>
                    <span className="text-[#B8B2A7]">{product.notes.base}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center text-sm md:text-base">
                  <span className="text-[#C9A24B] font-semibold mr-3">Longevity:</span>
                  <span className="text-[#B8B2A7]">{product.longevity}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C9A24B] text-[#0B0B0C] px-8 py-4 text-center font-semibold tracking-wide transition-all duration-300 hover:bg-[#B8922F] hover:shadow-lg hover:shadow-[#C9A24B]/20"
                >
                  Pesan via WhatsApp
                </a>
                <Link
                  href="/shop"
                  className="bg-transparent border border-[#C9A24B] text-[#C9A24B] px-8 py-4 text-center font-semibold tracking-wide transition-all duration-300 hover:bg-[#C9A24B] hover:text-[#0B0B0C]"
                >
                  Lihat Produk Lain
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12 md:mt-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#F5F1E8] mb-8 text-center">
              Produk Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products
                .filter((p) => p.id !== product.id)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/shop/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="bg-[#141414] border border-[#C9A24B]/20 overflow-hidden transition-all duration-300 hover:border-[#C9A24B] hover:shadow-lg hover:shadow-[#C9A24B]/10">
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="font-[family-name:var(--font-playfair)] text-lg md:text-xl text-[#F5F1E8] mb-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-[#C9A24B] text-xs md:text-sm mb-3">
                          {relatedProduct.character}
                        </p>
                        <span className="text-[#F5F1E8] font-semibold text-base md:text-lg">
                          Rp {relatedProduct.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#C9A24B]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#B8B2A7] text-sm">
            © 2026 Scentlaab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
