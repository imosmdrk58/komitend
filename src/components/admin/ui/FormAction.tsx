import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string
}

const FormAction: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => navigate(-1)}
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {title}
      </h1>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          type="button"
        >
          Discard
        </Button>
        <Button size="sm" type="submit">
          Save Post
        </Button>
      </div>
    </div>
  );
};

export default FormAction;
