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
      <div className="rounded-xl border p-3 sm:p-4">
        <h2 className="font-semibold">
          연결된 회원 목록
        </h2>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          아직 연결된 회원이 없습니다.
        </p>
      </div>
    );
  }
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-xl border p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold sm:text-lg">
          연결된 회원 목록
        </h2>

        {selectedMemberId && (
          <X
            className="shrink-0 cursor-pointer rounded-full p-1 hover:bg-slate-700"
            onClick={e => {
              setSelectedMemberId(null)
              e.stopPropagation()
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {members.map(member => {
          const isSelected = selectedMemberId === member.id

          return (
            <button
              key={member.id}
              type="button"
              onClick={e => {
                e.stopPropagation()
                setSelectedMemberId(member.id)
              }}
              className={`flex flex-col cursor-pointer items-start gap-1   rounded-lg border px-3 py-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4
                 ${isSelected
                  ? "border-indigo-500 bg-indigo-50 text-black"
                  : "border-gray-200 text-white"
                }`}
            >
              <span className="font-black">
                {member.name}
              </span>

              <span className="text-xs text-gray-500 sm:text-sm">
                잔여 PT {member.ptCount}회
              </span>
            </button>
          )
        })}
      </div>

      {selectedMemberId && (
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
          <input
            type="number"
            min={1}
            value={ptCount}
            onChange={event => setPtCount(event.target.value)}
            placeholder="등록할 PT 횟수"
            className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={adding}
            className="w-full shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
          >
            {adding ? "등록 중..." : "등록"}
          </button>
        </div>
      )}
    </div>
  )
}