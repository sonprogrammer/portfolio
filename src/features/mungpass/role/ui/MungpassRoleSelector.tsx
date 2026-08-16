'use client'


import { MungpassRole } from "@/features/mungpass/nav/model/types"
import { MRoleNotifications, useMarkRoleNotiRead } from "@/features/mungpass/notification/model"
import { roleOptions } from "@/features/mungpass/role/config"


interface MungpassRoleSelectorProps {
    role: MungpassRole | null
    noti?: MRoleNotifications
    onChange: (role: MungpassRole) => void
}

const badgeColorMap = {
    orange: 'bg-orange-500 text-white',
    blue: 'bg-blue-500 text-white',
    red: 'bg-red-500 text-white'
} as const

export function MungpassRoleSelector({ role, onChange, noti }: MungpassRoleSelectorProps) {
    const readMutation = useMarkRoleNotiRead()

    const handleRoleChange = (nextRole: MungpassRole) => {
        onChange(nextRole)
        if (nextRole === 'admin') {
            return
        }
        const notification = noti?.[nextRole]

        if (!notification?.count) {
            return
        }

        readMutation.mutate(nextRole)
    }

    const owner = role === 'owner'

    return (
        <div className="flex flex-col items-center gap-2 justify-center pb-2">


            <div className="grid w-full grid-cols-1  md:grid-cols-3 gap-2 md:gap-3">
                {roleOptions.map(option => {
                    const isSelected = role === option.value
                    const notification = noti?.[option.value]

                    const hasNotification = !!notification && notification.count > 0
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleRoleChange(option.value)}
                            className={`group relative flex items-center justify-center rounded-2xl border p-2 md:p-4 text-[8px] sm:text-sm font-semibold transition-all duration-300 ease-out cursor-pointer active:scale-[0.98]
                            ${isSelected
                                    ? owner
                                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                                        : 'border-orange-500 bg-orange-500/15 text-orange-400 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/50'
                                    : 'border-gray-800 bg-gray-900/40 text-gray-400 hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-300 hover:shadow-md'
                                }
                            `}
                        >
                            {option.label}
                            {hasNotification && (
                                <span
                                    className={`absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow ${badgeColorMap[notification.color]
                                        }`}
                                >
                                    {notification.count > 99
                                        ? '99+'
                                        : notification.count
                                    }
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}