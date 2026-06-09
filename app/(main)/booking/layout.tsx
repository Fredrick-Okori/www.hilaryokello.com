export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex bg-black flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="text-center  w-full justify-center">
          {children}
        </div>
      </section>
    );
  }
  