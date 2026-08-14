'use client';

import { X } from 'lucide-react';

import type { NoteItem } from '@/entities/bnty/note/model/noteTypes';
import { NoteEditForm } from '@/features/bnty/note/ui';
import { ModalPortal } from '@/shared/ui/modal';



interface NoteEditModalProps {
  open: boolean;
  note: NoteItem;
  onEdit?: (note: NoteItem) =>void
  onClose: () => void;
}

export function NoteEditModal({
  open,
  note,
  onClose,
}: NoteEditModalProps) {
  if (!open) {
    return null;
  }

  return (
    <ModalPortal isOpen={open}>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-edit-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-lg h-[70vh] overflow-hidden overflow-y-auto  rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-2xl"
      >
        <button
          type="button"
          aria-label="모달 닫기"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-5">
          <h2
            id="note-edit-title"
            className="text-xl font-bold text-gray-100"
          >
            운동 일지 수정
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            작성한 일지를 수정하거나 삭제할 수 있습니다.
          </p>
        </div>

        <NoteEditForm
          note={note}
          onSuccess={onClose}
        />
      </div>
    </div>
    </ModalPortal>
  );
}