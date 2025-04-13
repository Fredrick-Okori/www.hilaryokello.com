export default function GalleryLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex bg-black flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-7xl text-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  