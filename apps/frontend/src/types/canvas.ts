export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}

export type CanvasState = | { mode: CanvasMode.None | CanvasMode.Pressing }