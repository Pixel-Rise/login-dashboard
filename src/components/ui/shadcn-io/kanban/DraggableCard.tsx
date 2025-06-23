import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const DraggableCard = ({
  id,
  title,
  onEdit,
  onDelete,
}: {
  id: string;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-zinc-700 p-3 rounded-lg shadow cursor-grab flex justify-between items-center"
    >
      <span>{title}</span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
