
export const themeMap = {
    orange: {
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        hoverText: "hover:text-orange-400",
        button: 'bg-orange-500 hover:bg-orange-600',
        glow: 'bg-orange-500/10',
        icon: 'bg-orange-500/10 text-orange-400',
        label: 'text-orange-400',
        bg: "bg-orange-500/4"
    },

    emerald: {
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hoverText: "hover:text-emerald-400",
        button: 'bg-emerald-500 hover:bg-emerald-600',
        glow: 'bg-emerald-500/10',
        icon: 'bg-emerald-500/10 text-emerald-400',
        label: 'text-emerald-400',
        bg: "bg-emerald-500/4"
    },

    violet: {
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        hoverText: "hover:text-violet-400",
        button: 'bg-violet-500 hover:bg-violet-600',
        glow: 'bg-violet-500/10',
        icon: 'bg-violet-500/10 text-violet-400',
        label: 'text-violet-400',
        bg: "bg-violet-500/4"
    },
    blue: {
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hoverText: "hover:text-blue-400",
        button: 'bg-blue-700 hover:bg-blue-600',
        glow: 'bg-blue-500/10',
        icon: 'bg-blue-500/10 text-blue-400',
        label: 'text-blue-400',
        bg: "bg-blue-500/4"
    },

    red: {
        border: 'border-red-500/30',
        text: 'text-red-400',
        hoverText: "hover:text-red-400",
        button: 'bg-red-500 hover:bg-red-600',
        glow: 'bg-red-500/10',
        icon: 'bg-red-500/10 text-red-400',
        label: 'text-red-400',
        bg: "bg-red-500/4"
    }
} as const

export type ThemeType = keyof typeof themeMap