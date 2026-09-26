"use client";

import Link from "next/link";
import { useState } from "react";
import products from "@/data/products.json";

export default function CartPage() {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const product = products.find((item) => item.id === selectedId)!;
  const total = product.price * quantity;

  function orderViaWhatsApp() {
    const message = `Halo Scentlaab, saya ingin memesan ${quantity}x ${product.name} dengan total Rp ${total.toLocaleString("id-ID")}.`;
    window.open(`https://wa.me/628817522580?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <header className="border-b border-[#C9A24B]/20 py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl text-[#F5F1E8] tracking-wider">SCENTLAAB</Link>
          <Link href="/shop" className="text-[#B8B2A7] hover:text-[#C9A24B] transition-colors">Kembali ke Toko</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-[#F5F1E8] mb-3">Keranjang</h1>
        <div className="w-20 h-px bg-[#C9A24B] mb-10" />
        <div className="bg-[#141414] border border-[#C9A24B]/20 p-4 md:p-6 lg:p-8">
          <label htmlFor="product" className="block text-[#F5F1E8] mb-3 text-sm md:text-base">Pilih parfum</label>
          <select id="product" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="w-full bg-[#0B0B0C] border border-[#C9A24B]/40 text-[#F5F1E8] p-3 md:p-4 mb-6 text-sm md:text-base focus:outline-2 focus:outline-[#C9A24B]">
            {products.map((item) => <option key={item.id} value={item.id}>{item.name} - Rp {item.price.toLocaleString("id-ID")}</option>)}
          </select>
          <label htmlFor="quantity" className="block text-[#F5F1E8] mb-3 text-sm md:text-base">Jumlah</label>
          <input id="quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} className="w-full bg-[#0B0B0C] border border-[#C9A24B]/40 text-[#F5F1E8] p-3 md:p-4 mb-8 text-sm md:text-base focus:outline-2 focus:outline-[#C9A24B]" />
          <div className="border-t border-[#C9A24B]/20 pt-6 flex justify-between text-base md:text-lg mb-8">
            <span className="text-[#B8B2A7]">Subtotal</span>
            <span className="text-[#F5F1E8] font-semibold">Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <button type="button" onClick={orderViaWhatsApp} className="w-full bg-[#C9A24B] text-[#0B0B0C] px-6 py-3 md:py-4 font-semibold text-sm md:text-base hover:bg-[#b8922f] focus:outline-2 focus:outline-offset-2 focus:outline-[#F5F1E8]">
            Lanjutkan Pesanan di WhatsApp
          </button>
          {submitted && <p className="mt-5 text-[#B8B2A7] text-sm md:text-base" role="status">WhatsApp telah dibuka. Kirim pesan untuk mengonfirmasi pesanan Anda.</p>}
        </div>
      </main>
    </div>
  );
}
