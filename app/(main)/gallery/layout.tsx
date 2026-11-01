export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-cream flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">{children}</div>
    </section>
  );
}
