import { Piece } from "./pieces/piece";

export enum Color{
    White,
    Black
}

export type Coords = {
    x: number;
    y: number;
}

export enum FENChar {
    WhitePawn = "P",
    WhiteKnight = "N",
    WhiteBishop = "B",
    WhiteRook = "R",
    WhiteQueen = "Q",
    WhiteKing = "K",
    BlackPawn = "p",
    BlackKnight = "n",
    BlackBishop = "b",
    BlackRook = "r",
    BlackQueen = "q",
    BlackKing = "k"
}

export const pieceImagePaths: Readonly<Record<FENChar, string>> = {
    [FENChar.WhitePawn]: "assets/pieces/whitepawn.svg",
    [FENChar.WhiteKnight]: "assets/pieces/whiteknight.svg",
    [FENChar.WhiteBishop]: "assets/pieces/whitebishop.svg",
    [FENChar.WhiteRook]: "assets/pieces/whiterook.svg",
    [FENChar.WhiteQueen]: "assets/pieces/whitequeen.svg",
    [FENChar.WhiteKing]: "assets/pieces/whiteking.svg",
    [FENChar.BlackPawn]: "assets/pieces/blackpawn.svg",
    [FENChar.BlackKnight]: "assets/pieces/blackknight.svg",
    [FENChar.BlackBishop]: "assets/pieces/blackbishop.svg",
    [FENChar.BlackRook]: "assets/pieces/blackrook.svg",
    [FENChar.BlackQueen]: "assets/pieces/blackqueen.svg",
    [FENChar.BlackKing]: "assets/pieces/blackking.svg"
}

export type LegalSquares = Map<string, Coords[]>;

export enum MoveType {
    Capture,
    Castling,
    Promotion,
    Check,
    CheckMate,
    BasicMove
}

export type LastMove = {
    piece: Piece;
    prevX: number;
    prevY: number;
    currX: number;
    currY: number;
    moveType: Set<MoveType>
}

type KingChecked = {
    isInCheck: true;
    x: number;
    y: number;
}

type KingNotChecked = {
    isInCheck: false;
}

export type CheckState = KingChecked | KingNotChecked;

export type MoveList = ([string, string?])[];

export type GameHistroy = {
    lastMove: LastMove|undefined;
    checkState: CheckState;
    board: (FENChar | null)[][];

}[];