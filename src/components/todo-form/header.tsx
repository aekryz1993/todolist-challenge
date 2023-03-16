import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function TodoFormHeader({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <div className="ml-8 w-[calc(100%-32px)] flex h-10 shrink-0 gap-4 items-center mb-8">
      <ArrowLeftIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}
