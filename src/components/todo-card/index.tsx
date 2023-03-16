export default function TodoCardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-start max-w-full px-4">{children}</div>;
}
