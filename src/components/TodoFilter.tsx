import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <div className="flex gap-2">
      {(["all", "active", "completed"] as FilterType[]).map((filter) => (
        <Button
          key={filter}
          variant="ghost"
          onClick={() => onFilterChange(filter)}
          className={cn(
            "capitalize",
            currentFilter === filter && "bg-blue-50 text-blue-600 hover:bg-blue-100"
          )}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilter;