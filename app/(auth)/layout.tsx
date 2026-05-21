export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-background-screen min-h-screen">{children}</div>;
}
