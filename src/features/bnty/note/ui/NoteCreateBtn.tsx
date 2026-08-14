'use client'
import { Plus } from 'lucide-react';

interface NoteCreateButtonProps {
    disabled?: boolean;
    onClick: () => void;
}

export function NoteCreateBtn({ disabled = false, onClick }: NoteCreateButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Plus size={16} />
            일지 추가
        </button>
    )
}