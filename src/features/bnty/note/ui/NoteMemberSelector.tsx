'use client'

import { Users } from "lucide-react"

import type { ConnectedMember } from "@/features/bnty/user/model/types"

interface NoteMemberSelectorProps {
    members: ConnectedMember[]
    selectedMemberId: string | null
    onSelect: (memberId: string) => void
}

export function NoteMemberSelector({ members, selectedMemberId, onSelect }: NoteMemberSelectorProps) {
    return (
        <section className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="mb-3 flex items-center gap-2">
                <Users size={18} className="text-indigo-400" />

                <h2 className="font-semibold text-gray-100">
                    연결된 회원
                </h2>
            </div>

            {members.length === 0 ? (
                <p className="text-sm text-gray-400">
                    연결된 회원이 없습니다.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {members.map((member) => {
                        const isSelected =
                            selectedMemberId === member.id;

                        return (
                            <button
                                key={member.id}
                                type="button"
                                onClick={() => onSelect(member.id)}
                                className={`rounded-full border px-4 py-2 text-sm transition ${isSelected
                                        ? 'border-indigo-500 bg-indigo-500 text-white'
                                        : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-indigo-500'
                                    }`}
                            >
                                {member.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    )
}