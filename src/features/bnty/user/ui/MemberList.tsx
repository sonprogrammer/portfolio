'use client'

import { useAddMemberPtCount } from "@/features/bnty/user/model"
import { useGetConnectedMembers } from "@/features/bnty/user/model"
import { useState } from "react"
import { X } from 'lucide-react'
interface MemberListProps {
  trainerId: string
}


export function MemberList({ trainerId }: MemberListProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)

  const [ptCount, setPtCount] = useState('')

  const { data: members, isPending } = useGetConnectedMembers(trainerId)

  const { mutate: addPtCount, isPending: adding } = useAddMemberPtCount(trainerId)

  const handleSubmit = () => {
    if (!selectedMemberId) {
      return
    }

    const count = Number(ptCount)

    if (!Number.isInteger(count) || count <= 0) {
      return
    }
    addPtCount({ trainerId, memberId: selectedMemberId, count }, { onSuccess: () => { setPtCount('') } })
  }

  if (isPending) {
    return <p>회원 불러오는 중</p>
  }

  if (!members || members.length === 0) {
    return (
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold">
          연결된 회원 목록
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          아직 연결된 회원이 없습니다.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          연결된 회원 목록
        </h2>
        {selectedMemberId &&
          <X className="hover:bg-slate-700 cursor-pointer rounded-full p-1"
            onClick={(e) => {
              setSelectedMemberId(null)
              e.stopPropagation()
            }
            }
          />
        }
      </div>

      <div className="flex flex-col gap-2">
        {members.map((member) => {
          const isSelected =
            selectedMemberId === member.id;

          return (
            <button
              key={member.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedMemberId(member.id)
              }}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left cursor-pointer ${isSelected
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200'
                }`}
            >
              <span className="font-medium">
                {member.name}
              </span>

              <span className="text-sm text-gray-500">
                잔여 PT {member.ptCount}회
              </span>
            </button>
          );
        })}
      </div>

      {selectedMemberId && (
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            value={ptCount}
            onChange={(event) =>
              setPtCount(event.target.value)
            }
            placeholder="등록할 PT 횟수"
            className="flex-1 rounded-lg border px-3 py-2"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={adding}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            {adding
              ? '등록 중...'
              : '등록'}
          </button>
        </div>
      )}


    </div>
  )
}