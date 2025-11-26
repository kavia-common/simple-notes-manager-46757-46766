import React from "react";
import { Note } from "../utils/storage";
import { NoteItem } from "./NoteItem";
import { useTheme } from "../theme";

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

// PUBLIC_INTERFACE
export const NotesList: React.FC<Props> = ({ notes, onEdit, onDelete }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        maxWidth: 1040,
        margin: "20px auto",
        padding: "0 20px 40px 20px",
      }}
    >
      {notes.length === 0 ? (
        <div
          style={{
            background: theme.colors.surface,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadow.md,
            padding: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            textAlign: "center",
            color: "rgba(17,24,39,0.7)",
          }}
        >
          No notes yet. Click "Add Note" to create your first note.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {notes.map((n) => (
            <NoteItem key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
