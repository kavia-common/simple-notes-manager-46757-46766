import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { NotesApp } from "./NotesApp";

/**
 * A thin wrapper component to avoid passing an inline function as a composition component.
 * This helps prevent hot-reload edge-cases that could cause the preview to unmount/close.
 */
const NotesAppFill: React.FC = () => (
  <AbsoluteFill>
    <NotesApp />
  </AbsoluteFill>
);

/**
 * RemotionRoot - Entrypoint for Remotion Studio.
 * We mount a single Composition that renders the NotesApp,
 * enabling the SPA-like experience within the Remotion preview at /.
 */
// PUBLIC_INTERFACE
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesManager"
        // Use a stable component reference rather than an inline arrow function
        component={NotesAppFill}
        durationInFrames={300} // Not used for persistence; required by Remotion
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
