import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { NotesApp } from "./NotesApp";

/**
 * RemotionRoot - Entrypoint for Remotion Studio.
 * We mount a single Composition that renders the NotesApp,
 * enabling the SPA-like experience within the Remotion preview at /.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesManager"
        component={() => (
          <AbsoluteFill>
            <NotesApp />
          </AbsoluteFill>
        )}
        durationInFrames={300} // Not used for persistence; required by Remotion
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
