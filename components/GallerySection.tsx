/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const galleryImages = [
    "/gallery1.png",
    "/gallery2.png",
    "/gallery3.png",
    "/gallery4.png",
    "/gallery5.png",
    "/gallery6.png",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Galerie</h2>

      {/* ✅ Image grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-white cursor-pointer"
            onClick={() => setActiveImageIndex(i)}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-auto object-cover aspect-[2/3]"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* ✅ Lightbox modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-5 text-white text-3xl font-bold"
              onClick={() => setActiveImageIndex(null)}
            >
              ✕
            </button>

            <motion.img
              key={activeImageIndex}
              src={galleryImages[activeImageIndex!]}
              alt="Preview"
              className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            />

            {/* Navigation arrows */}
            <button
              className="absolute left-5 text-white text-4xl"
              onClick={() =>
                setActiveImageIndex(
                  (activeImageIndex! - 1 + galleryImages.length) %
                    galleryImages.length
                )
              }
            >
              ‹
            </button>
            <button
              className="absolute right-5 text-white text-4xl"
              onClick={() =>
                setActiveImageIndex(
                  (activeImageIndex! + 1) % galleryImages.length
                )
              }
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
