export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex bg-cream flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/* Same texture as the home hero: texture.png mirrored into a seamless
          2×2 tile. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url('/texture-tile.webp')] bg-[length:360px_auto] bg-repeat opacity-10 md:bg-[length:560px_auto]"
      />
      <div className="w-full">{children}</div>
    </section>
  );
}
