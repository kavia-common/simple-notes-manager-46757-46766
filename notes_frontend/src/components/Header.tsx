import React from "react";
import { useTheme } from "../theme";

type Props = {
  onAdd: () => void;
};

// PUBLIC_INTERFACE
export const Header: React.FC<Props> = ({ onAdd }) => {
  const theme = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: theme.colors.surface,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: theme.shadow.sm,
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            aria-hidden
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: theme.shadow.md,
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              letterSpacing: 0.2,
              color: theme.colors.text,
            }}
          >
            Notes Manager
          </h1>
        </div>
        <button
          onClick={onAdd}
          style={{
            background: theme.colors.primary,
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.md,
            cursor: "pointer",
            fontWeight: 600,
            transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
          }}
          onMouseDown={(e) => {
            try {
              // Avoid referencing DOM types directly for linter compatibility
              (e.currentTarget as any).style.transform = "translateY(1px)";
            } catch {
              /* noop */
            }
          }}
          onMouseUp={(e) => {
            try {
              (e.currentTarget as any).style.transform = "translateY(0px)";
            } catch {
              /* noop */
            }
          }}
        >
          + Add Note
        </button>
      </div>
    </header>
  );
};
