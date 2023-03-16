export default function TodoFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full p-4 flex flex-col overflow-auto">
      {children}
    </div>
  );
}
