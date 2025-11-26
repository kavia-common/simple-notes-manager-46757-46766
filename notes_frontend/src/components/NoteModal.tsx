import React, { useEffect, useMemo, useRef, useState } from "react";
import { Note } from "../utils/storage";
import { useTheme } from "../theme";

type Props = {
  open: boolean;
  initial?: Partial<Note> | null;
  onClose: () => void;
  onSubmit: (payload: { title: string; content: string; id?: string }) => void;
};

// PUBLIC_INTERFACE
export const NoteModal: React.FC<Props> = ({ open, initial, onClose, onSubmit }) => {
  const theme = useTheme();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const isEdit = !!initial?.id;
  const titleRef = useRef<any>(null);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setContent(initial?.content ?? "");
      // Use globalThis.setTimeout to avoid linter no-undef on setTimeout symbol
      (globalThis as any).setTimeout?.(() => {
        try {
          titleRef.current?.focus();
        } catch {
          /* noop */
        }
      }, 0);
    }
  }, [open, initial]);

  const canSubmit = useMemo(() => title.trim().length > 0 && content.trim().length > 0, [title, content]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit note" : "Add note"}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(17,24,39,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 50,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: theme.colors.surface,
          borderRadius: theme.radius.xl,
          boxShadow: theme.shadow.lg,
          border: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: `linear-gradient(135deg, ${theme.colors.primary}10, #ffffff)`,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>{isEdit ? "Edit Note" : "Add Note"}</h2>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 13, color: "rgba(17,24,39,0.7)" }}>
            Title
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                outline: "none",
              }}
            />
          </label>
          <label style={{ fontSize: 13, color: "rgba(17,24,39,0.7)" }}>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={8}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                outline: "none",
                resize: "vertical",
              }}
            />
          </label>
        </div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            background: "#fafafa",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              color: theme.colors.text,
              border: "1px solid rgba(0,0,0,0.15)",
              padding: "8px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!canSubmit) return;
              onSubmit({ title: title.trim(), content: content.trim(), id: initial?.id });
            }}
            disabled={!canSubmit}
            style={{
              background: theme.colors.primary,
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 10,
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontWeight: 700,
              boxShadow: canSubmit ? "0 6px 16px rgba(37,99,235,0.25)" : "none",
              opacity: canSubmit ? 1 : 0.6,
            }}
          >
            {isEdit ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
};
