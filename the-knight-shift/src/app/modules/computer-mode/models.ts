import { Color, FENChar } from "../../../../../the-knight-shift/src/app/chess-logic/models";

export type StockfishQueryParams = {
    fen: string;
    depth: number;
}

export type ChessMove = {
    prevX: number;
    prevY: number;
    newX: number;
    newY: number;
    promotedPiece: FENChar|null;
}

export type StockfishResponse = {
    success: boolean;
    evaluation: number | null;
    mate: number | null;
    bestMove: string;
    continuation: string;
}

export type ComputerConfiguration = {
    color: Color;
    level: number;
}

export const stockfishLevels: Readonly<Record<number, number>> = {
    1:1,
    2:4,
    3:7,
    4:10,
    5:13
}