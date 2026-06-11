import { motion } from 'motion/react';
import React from 'react';
import SEO from '../components/SEO';
import { useCardTilt } from '../hooks/useCardTilt';

const images = [
  { src: "/IMG_5418.JPG", caption: "A layered aesthetic experience." },
  { src: "/IMG_5409.JPG", caption: "Precision in every sip." },
  { src: "/IMG_5410.JPG", caption: "Radiant crimson hues." },
  { src: "/IMG_5416.JPG", caption: "Refreshing complexity." },
  { src: "/IMG_5417.JPG", caption: "Floral and layered." },
  { src: "/IMG_5411.JPG", caption: "Autumn warmth captured." },
  { src: "/IMG_5408.JPG", caption: "The Luma signature." }
];

function MagneticGalleryTile({ image, caption, className = "" }: any) {
  const { cardRef, rotateX, rotateY, onMouseMove, onMouseLeave } = useCardTilt(8);

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`relative z-10 hover:z-20 border border-gold/10 rounded-lg overflow-hidden bg-ink-card group hover:border-gold/30 transition-shadow hover:shadow-[0_20px_50px_rgba(201,162,58,0.15)] ${className}`}
    >
      <img
        src={image}
        alt={`Luma premium non-alcoholic mobile mocktail bar catering for luxury events and weddings in Amman, Jordan - ${caption}`}
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:brightness-[0.95] transition-all duration-700 group-hover:scale-[1.03]"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="text-base uppercase tracking-[0.4em] text-gold mb-2">Luma Ritual</div>
        <div className="text-base text-cream font-medium">{caption}</div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Luma Mocktail Bar Gallery",
    "description": "A visual library of our atmospheric setups, handcrafted mocktails, and premium glassware for luxury weddings and events in Amman.",
    "url": "https://lumajordan.com/gallery",
    "image": "https://lumajordan.com/IMG_5418.JPG",
    "publisher": {
      "@type": "Organization",
      "name": "Luma Mocktail Bar"
    }
  };

  return (
    <div className="pt-32 pb-32">
      <SEO
        title="Gallery | Premium Non-Alcoholic Bar in Amman | Luma Mocktail Bar"
        description="A visual library of our atmospheric setups, handcrafted mocktails, and premium glassware. See the Luma ritual at luxury events and weddings in Amman."
        keywords="mocktail gallery amman, luxury wedding bar photos jordan, mobile drinks bar pictures, premium glassware mocktail presentation, luma bar events"
        image="https://lumajordan.com/IMG_5418.JPG"
        schema={gallerySchema}
      />
      <section className="text-center px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-micro block mb-4">The Visual Library</span>
          <h1 className="display text-5xl md:text-7xl mb-8">
            Atmospheric <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">Concepts</em>
          </h1>
          <p className="text-cream text-base max-w-xl mx-auto leading-relaxed">
            Each drink is a composition. Each setup, an installation. A glimpse into the Luma aesthetic with our Luma Ritual gallery.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <MagneticGalleryTile
          className="aspect-[4/5] sm:col-span-2 lg:row-span-2 lg:col-span-2 min-h-[400px]"
          image={images[0].src}
          caption={images[0].caption}
        />
        <MagneticGalleryTile className="aspect-square" image={images[1].src} caption={images[1].caption} />
        <MagneticGalleryTile className="aspect-square" image={images[2].src} caption={images[2].caption} />
        <MagneticGalleryTile
          className="aspect-[4/5] sm:col-span-2 lg:col-span-1 min-h-[300px]"
          image={images[3].src}
          caption={images[3].caption}
        />
        <MagneticGalleryTile className="aspect-square" image={images[4].src} caption={images[4].caption} />
        <MagneticGalleryTile className="aspect-square" image={images[5].src} caption={images[5].caption} />
        <MagneticGalleryTile
          className="aspect-square sm:col-span-2 lg:col-span-3 lg:aspect-auto min-h-[300px]"
          image={images[6].src}
          caption={images[6].caption}
        />
      </div>
    </div>
  );
}
