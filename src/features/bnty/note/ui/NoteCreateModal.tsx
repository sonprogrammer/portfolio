// src/features/bnty/note/ui/NoteCreateModal.tsx

'use client';

import { X } from 'lucide-react';
import type { ConnectedMember } from '@/features/bnty/user/model/types'
import { NoteCreateForm } from '@/features/bnty/note/ui';
import { ModalPortal } from '@/shared/ui/modal';




interface NoteCreateModalProps {
  open: boolean;
  trainerId: string;
  member: ConnectedMember;
  onClose: () => void;
}

export function NoteCreateModal({
  open,
  trainerId,
  member,
  onClose,
}: NoteCreateModalProps) {
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
          aria-labelledby="note-create-title"
          onClick={(event) =>
            event.stopPropagation()
          }
          className="relative w-full h-[70vh] overflow-hidden overflow-y-auto max-w-lg rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-2xl"
        >
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mb-5">
            <h2
              id="note-create-title"
              className="text-xl font-bold text-gray-100"
            >
              운동 일지 작성
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {member.name} 회원의 일지를 작성합니다.
            </p>
          </div>

          <NoteCreateForm
            trainerId={trainerId}
            memberId={member.id}
            chatRoomId={member.chatRoomId}
            onSuccess={onClose}
          />
        </div>
      </div>
    </ModalPortal>
  );
}