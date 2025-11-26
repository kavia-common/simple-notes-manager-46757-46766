import React from "react";
import { Note, formatDate } from "../utils/storage";
import { useTheme } from "../theme";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

// PUBLIC_INTERFACE
export const NoteItem: React.FC<Props> = ({ note, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadow.md,
        padding: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18, color: theme.colors.text }}>{note.title}</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onEdit(note)}
            title="Edit"
            style={{
              background: "transparent",
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}`,
              padding: "6px 10px",
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            title="Delete"
            style={{
              background: "transparent",
              color: theme.colors.error,
              border: `1px solid ${theme.colors.error}`,
              padding: "6px 10px",
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p style={{ margin: 0, color: "rgba(17,24,39,0.85)", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{note.content}</p>
      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
        <span style={{ fontSize: 12, color: "rgba(17,24,39,0.6)" }}>Created: {formatDate(note.createdAt)}</span>
        <span style={{ fontSize: 12, color: "rgba(17,24,39,0.6)" }}>Updated: {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
};
