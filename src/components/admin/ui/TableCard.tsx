import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface TableCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const TableCard: React.FC<TableCardProps> = ({
  title,
  description,
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        if (searchTerm.length > 0 && searchTerm !== searchParams.get("search")) {
          searchParams.append("search", searchTerm);
          setSearchParams(searchParams);
        }
      } else {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchParams, searchParams]);

  return (
    <Card className={!title && !description ? "pt-6" : ""}>
      {(title || description) && (
        <CardHeader className="flex flex-row justify-between">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Input placeholder="Search..." className="w-52 md:w-72" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default TableCard;
