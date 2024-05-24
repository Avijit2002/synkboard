export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}
export enum LayerType {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note
}

export type CanvasState =
    {
        mode: CanvasMode.None
    } |
    {
        mode: CanvasMode.Pressing
        origin: Point
    } |
    {
        mode: CanvasMode.SelectionNet
        origin: Point
        current?: Point
    } |
    {
        mode: CanvasMode.Translating
        current: Point
    } |
    {
        mode: CanvasMode.Inserting
        LayerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Path | LayerType.Text
    } |
    {
        mode: CanvasMode.Resizing
        initialBounds: XYHW
        corner: Side
    } |
    {
        mode: CanvasMode.Pencil
    }


export type Color = {
    r: number,
    g: number,
    b: number
}

export type Camera = {
    x: number,
    y: number
}


// Moved to common package, as it is shared by both client and server

// This type will be valid for all types of layer. No need of defining separetly
// export type Layer = {
//     id: string
//     type: number  // type of layertype LayerType enum Rectangle is number
//     x: number
//     y: number
//     height: number,
//     width: number,
//     fill: Color,
//     points?: number[][] // for path layer
//     value?: string   // for note layer

//     selectedBy?: string
// }

export type Point = {
    x: number,
    y: number
}

export type XYHW = {    // X Y Height Width // for translating and resizing
    x: number
    y: number
    width: number
    height: number
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}
