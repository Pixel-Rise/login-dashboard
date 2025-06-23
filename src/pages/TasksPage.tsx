import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { KanbanBoard } from "@/components/ui/shadcn-io/kanban";
import { DraggableCard } from "@/components/ui/shadcn-io/kanban/DraggableCard";
import { Button } from "@/components/ui/button";
import { FiSettings } from "react-icons/fi";

const statuses = [
  { id: "todo", name: "Bajarilishi kerak", color: "red" },
  { id: "inprogress", name: "Jarayonda", color: "yellow" },
  { id: "done", name: "Bajarilgan", color: "green" },
];

const initialFeatures = [
  {
    id: "1",
    name: "Yangi topshiriq",
    startAt: new Date(),
    endAt: new Date(),
    status: statuses[0],
  },
  {
    id: "2",
    name: "Kod yozish",
    startAt: new Date(),
    endAt: new Date(),
    status: statuses[1],
  },
  {
    id: "3",
    name: "Tekshiruv",
    startAt: new Date(),
    endAt: new Date(),
    status: statuses[2],
  },
];

const TasksPage: React.FC = () => {
  const userEmail = "matsalayev@outlook.com";
  const userName = "Azizbek";
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [features, setFeatures] = useState(initialFeatures);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      const updated = features.map((f) =>
        f.id === active.id
          ? { ...f, status: statuses.find((s) => s.id === over.id)! }
          : f
      );
      setFeatures(updated);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="flex h-screen bg-zinc-950 text-gray-100">
        <div className="transition-all duration-300 bg-zinc-900 overflow-hidden">
          {isSidebarOpen && <Sidebar userName={userName} userEmail={userEmail} />}
        </div>
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "pl-64" : "pl-0"
          }`}
        >
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex justify-between items-center p-6">
            <h1 className="text-2xl font-bold">Vazifalar</h1>
            <Button
              size="lg"
              onClick={() => console.log("Settings clicked")}
            >
              <FiSettings className="w-8 h-8" />
            </Button>
          </div>
          <main className="p-6">
            <section>
              <div className="grid grid-cols-3 gap-4">
                {statuses.map((status) => (
                  <KanbanBoard
                    key={status.id}
                    id={status.id}
                    className="bg-zinc-800 p-4 rounded-xl"
                  >
                    <h2 className="text-lg font-semibold mb-2">{status.name}</h2>
                    <div className="space-y-2">
                      {features
                        .filter((f) => f.status.id === status.id)
                        .map((feature) => (
                          <DraggableCard
                            key={feature.id}
                            id={feature.id}
                            title={feature.name}
                            onEdit={() =>
                              console.log(`Editing feature: ${feature.id}`)
                            }
                            onDelete={() =>
                              console.log(`Deleting feature: ${feature.id}`)
                            }
                          />
                        ))}
                    </div>
                  </KanbanBoard>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </DndContext>
  );
};

export default TasksPage;
