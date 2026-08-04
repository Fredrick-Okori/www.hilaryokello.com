export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-black flex-col items-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-7xl text-left">{children}</div>
    </section>
  );
}
