import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider, appBaseStyles, useTheme } from "./theme";
import { Header } from "./components/Header";
import { NotesList } from "./components/NotesList";
import { NoteModal } from "./components/NoteModal";
import { Note, loadNotes, saveNotes } from "./utils/storage";

// Generate a reasonably unique ID without relying on global crypto in linting context
const makeId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
  return `${Date.now().toString(36)}-${s4()}${s4()}-${s4()}`;
};

/**
 * Top-level NotesApp component renders a single-page experience for managing Notes.
 * Uses localStorage for persistence; no backend is required.
 */
const InnerApp: React.FC = () => {
  const theme = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);

  // Load on mount
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  // Persist on change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const onAdd = useCallback(() => {
    setEditing(null);
    setModalOpen(true);
  }, []);

  const onEdit = useCallback((n: Note) => {
    setEditing(n);
    setModalOpen(true);
  }, []);

  const onDelete = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const onSubmit = useCallback(
    (payload: { title: string; content: string; id?: string }) => {
      const now = new Date().toISOString();
      if (payload.id) {
        // Edit
        setNotes((prev) =>
          prev.map((n) =>
            n.id === payload.id ? { ...n, title: payload.title, content: payload.content, updatedAt: now } : n
          )
        );
      } else {
        // Create
        const id = makeId();
        const next: Note = {
          id,
          title: payload.title,
          content: payload.content,
          createdAt: now,
          updatedAt: now,
        };
        setNotes((prev) => [next, ...prev]);
      }
      setModalOpen(false);
      setEditing(null);
    },
    []
  );

  const emptyStateAccent: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      inset: 0,
      background: `radial-gradient(800px 300px at 10% -20%, ${theme.colors.primary}0f, transparent), radial-gradient(900px 400px at 110% 0%, ${theme.colors.secondary}12, transparent)`,
      pointerEvents: "none",
    }),
    [theme]
  );

  return (
    <div style={{ ...appBaseStyles, minHeight: "100vh", position: "relative" }}>
      <div style={emptyStateAccent} />
      <Header onAdd={onAdd} />
      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "20px 20px 40px 20px" }}>
        <div
          style={{
            background: theme.colors.surface,
            borderRadius: 14,
            padding: 16,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: theme.shadow.sm,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18, color: theme.colors.text }}>Your Notes</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onAdd}
                style={{
                  background: theme.colors.secondary,
                  color: "#1f2937",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 6px 16px rgba(245,158,11,0.25)",
                }}
              >
                New Note
              </button>
            </div>
          </div>
          <NotesList notes={notes} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </main>
      <NoteModal
        open={modalOpen}
        initial={editing ?? undefined}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

// PUBLIC_INTERFACE
export const NotesApp: React.FC = () => {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
};
