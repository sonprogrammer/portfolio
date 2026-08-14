'use client';

import { useState } from 'react';

import type { BntyUser } from '@/entities/bnty/user/model/userTypes';

import { NoteCreateBtn, NoteCreateModal, NoteList, NoteMemberSelector } from '@/features/bnty/note/ui';
import { useGetConnectedMembers } from '@/features/bnty/user/model';
import { LoadingBar } from '@/shared/ui/loadingbar';
import { useGetNotes } from '@/features/bnty/note/model/useGetNotes';




interface NotePageProps {
  user: BntyUser
  role: 'member' | 'trainer';
}

export function NotePage({
  user,
  role,
}: NotePageProps) {
  const isTrainer = role === 'trainer';
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  const {
    data: members = [],
    isPending: isMembersPending,
  } = useGetConnectedMembers(
    isTrainer ? user.id : '',
  );


  const selectedMember = members.find(m => m.id === selectedMemberId) ?? null

  const {
    data: notes = [],
    isFetching: isNotesFetching,
  } = useGetNotes({
    userId: user.id,
    role,
    memberId:
      isTrainer
        ? selectedMember?.id
        : undefined,
  })


  if (isTrainer && isMembersPending) {
    return (
      <LoadingBar text="연결된 회원을 불러오는 중..." />
    );
  }



  if (isTrainer && isMembersPending) {
    return (
      <LoadingBar text="연결된 회원을 불러오는 중..." />
    );
  }

  return (
    <section className="flex min-h-150 flex-col gap-5">
      {isTrainer && (
        <NoteMemberSelector
          members={members}
          selectedMemberId={selectedMemberId}
          onSelect={setSelectedMemberId}
        />
      )}

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">
            운동 일지
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            {isTrainer
              ? selectedMember
                ? `${selectedMember.name} 회원의 운동 일지입니다.`
                : '일지를 확인할 회원을 선택해주세요.'
              : '트레이너가 작성한 운동 일지입니다.'}
          </p>
        </div>

        {isTrainer && (
          <NoteCreateBtn
            disabled={!selectedMember}
            onClick={() =>
              setIsCreateModalOpen(true)
            }
          />
        )}
      </header>

      {isTrainer && !selectedMember ? (
        <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">
            운동 일지를 확인할 회원을 선택해주세요.
          </p>
        </div>
      ) : isNotesFetching ? (
        <LoadingBar text="운동 일지를 불러오는 중..." />
      ) :
        (
          <NoteList
            notes={notes}
            canManage={isTrainer}
          />
        )}

      {isTrainer && selectedMember && (
        <NoteCreateModal
          open={isCreateModalOpen}
          onClose={() =>
            setIsCreateModalOpen(false)
          }
          trainerId={user.id}
          member={selectedMember}
        />
      )}
    </section>
  );
}