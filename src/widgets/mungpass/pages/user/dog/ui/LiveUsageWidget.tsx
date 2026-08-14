'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Dog, Minimize2 } from 'lucide-react'
import { useState } from 'react'
import { LiveUsageCard } from '@/widgets/mungpass/pages/user/dog/ui/LiveUsageCard'
import { MyPetUsageAllInfo } from '@/features/mungpass/check-in/model'

interface LiveUsageWidgetProps {
    activeDogs: MyPetUsageAllInfo[]
    dogCount: number
}

export function LiveUsageWidget({
    activeDogs,
    dogCount,
}: LiveUsageWidgetProps) {
    const [isMinimized, setIsMinimized] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)


    if (activeDogs.length === 0) {
        return null
    }

    const currentUsage = activeDogs[currentIndex]

    if (!currentUsage) {
        return null
    }


    return (
        <AnimatePresence mode="wait">
            {isMinimized ? (
                <motion.div
                    key="minimized"
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    exit={{
                        x: 100,
                        opacity: 0,
                    }}
                    onClick={() =>
                        setIsMinimized(false)
                    }
                    className="
            pointer-events-auto
            inline-flex
            cursor-pointer
            items-center
            gap-3
            rounded-full
            border
            border-orange-500/40
            bg-gray-900/90
            p-1.5
            pr-4
            shadow-2xl
            backdrop-blur-xl
            transition-all
            duration-200
            hover:border-orange-500
            hover:bg-gray-900
          "
                >
                    <div
                        className="
              flex
              h-9
              w-9
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/10
              text-orange-400
            "
                    >
                        <Dog className="h-4 w-4" />
                    </div>

                    <span className="text-sm font-extrabold text-gray-100 tracking-tight">
                        {dogCount >= 1
                            ? `${currentUsage.dog.name} 외 ${dogCount}마리 이용중`
                            : `${currentUsage.dog.name} 이용중`}
                    </span>

                    <ChevronUp className="h-4 w-4 text-orange-400" />
                </motion.div>
            ) : (
                <motion.div
                    key="maximized"
                    initial={{
                        y: 50,
                        opacity: 0,
                        scale: 0.95,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        y: 50,
                        opacity: 0,
                        scale: 0.95,
                    }}
                    className="
            pointer-events-auto
            relative
            w-90
            max-w-[calc(100vw-2rem)]
          "
                >
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-800 bg-gray-950/80 shadow-2xl backdrop-blur-2xl">
                        <motion.div
                            className="flex"
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 26,
                            }}
                        >
                            {activeDogs.map(
                                dogUsage => (
                                    <div
                                        key={dogUsage.id}
                                        className="min-w-full"
                                    >
                                        <LiveUsageCard
                                            dogUsage={dogUsage}
                                        />
                                    </div>
                                )
                            )}
                        </motion.div>

                        <button
                            type="button"
                            onClick={() => {setIsMinimized(true)}}
                            className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-8
                w-8
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-gray-700
                bg-gray-900/80
                text-gray-300
                backdrop-blur-md
                transition-all
                hover:border-orange-500/50
                hover:bg-gray-900
                hover:text-orange-400
              "
                        >
                            <Minimize2 className="h-4 w-4" />
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}