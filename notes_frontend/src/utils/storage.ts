export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const STORAGE_KEY = "notes_manager_notes_v1";

const getStorage = (): any | null => {
  try {
    const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : null;
    if (g && g.localStorage) return g.localStorage as any;
  } catch {
    // ignore
  }
  return null;
};

// PUBLIC_INTERFACE
export function loadNotes(): Note[] {
  try {
    const ls = getStorage();
    if (!ls) return [];
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((n) => ({
      ...n,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
    }));
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes: Note[]) {
  try {
    const ls = getStorage();
    if (!ls) return;
    ls.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Ignore write errors
  }
}

// PUBLIC_INTERFACE
export function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } catch {
    return iso;
  }
}
