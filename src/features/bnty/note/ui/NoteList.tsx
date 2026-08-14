'use client'

import { FileText } from "lucide-react"

import type { NoteItem } from "@/entities/bnty/note/model/noteTypes"
import { NoteCard } from "@/features/bnty/note/ui"

interface NoteListProps {
    notes: NoteItem[];
    canManage: boolean;
    trainerId?: string
}

export function NoteList({
    notes,
    canManage,
}: NoteListProps) {
    if (notes.length === 0) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 text-center">
                <FileText
                    size={42}
                    className="mb-3 text-gray-600"
                />

                <p className="text-sm text-gray-400">
                    아직 작성된 운동 일지가 없습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    canManage={canManage}
                />
            ))}
        </div>
    );
}