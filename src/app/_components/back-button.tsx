import { ArrowLeft } from "lucide-react";

export const BackButton = (onBack: () => void) => {
  return (
    <div
      className="flex flex-row border border-black px-2 py-2 gap-2"
      onClick={onBack}
    >
      <ArrowLeft strokeWidth={1.5} />
      <p className="text-[14px] font-semibold text-primaryExt1">Back</p>
    </div>
  );
};
