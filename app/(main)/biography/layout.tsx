export default function BiographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-cream flex-col items-center justify-center gap-4 pb-8 md:pb-10">
      <div className="text-center w-full justify-center">{children}</div>
    </section>
  );
}
