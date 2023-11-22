import { ReorderTasksInStore } from "@/services/tasks/ReorderTasksInStore";
import { useAppStore } from "@/store/useAppStore";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const tasks = useAppStore((s) => s.tasks);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    ReorderTasksInStore(tasks, result.source.index, result.destination.index);
  };

  return (
    <SessionProvider session={session}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Component {...pageProps} />;
      </DragDropContext>
    </SessionProvider>
  );
}
