'use client';

import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';

import { MInquiryRole, MInquiryRoom } from '../model';
import { InquiryList } from './InquiryList';
import { InquiryCreateForm } from './InquiryCreateForm';
import { InquiryChat } from './InquiryChat';
import { ModalPortal } from '@/shared/ui/modal';

interface InquiryModalProps {
    isOpen: boolean;
    senderRole: MInquiryRole;
    onClose: () => void;
}

type ViewMode = 'list' | 'write' | 'chat';

export function InquiryModal({
    isOpen,
    senderRole,
    onClose
}: InquiryModalProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedRoom, setSelectedRoom] = useState<MInquiryRoom | null>(null);

    if (!isOpen) return null;

    const handleClose = () => {
        setViewMode('list');
        setSelectedRoom(null);
        onClose();
    };

    const handleBack = () => {
        setViewMode('list');
        setSelectedRoom(null);
    };

    const handleOpenRoom = (room: MInquiryRoom) => {
        setSelectedRoom(room);
        setViewMode('chat');
    };

    return (
        <ModalPortal isOpen={isOpen}>
            <div
                className="fixed inset-0 z-50000 flex items-center justify-center bg-black/70  p-4 animate-in fade-in duration-200"
                onClick={handleClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-[2.5rem] bg-gray-900 border border-gray-800 shadow-2xl backdrop-blur-xl text-gray-100"
                >
                    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                        <div className="flex items-center gap-3">
                            {viewMode !== 'list' && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="rounded-xl p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors cursor-pointer"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                            )}

                            <div>
                                <h2 className="font-extrabold text-gray-100 tracking-tight text-base">
                                    {viewMode === 'chat' && selectedRoom
                                        ? selectedRoom.title
                                        : '1:1 문의'}
                                </h2>

                                {viewMode === 'list' && (
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        멍패스 이용 중 궁금한 내용을 문의해보세요.
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-xl p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-hidden bg-gray-950/40">
                        {viewMode === 'list' && (
                            <InquiryList
                                onWrite={() => setViewMode('write')}
                                onOpenRoom={handleOpenRoom}
                            />
                        )}

                        {viewMode === 'write' && (
                            <div className='h-full overflow-y-auto no-scrollbar p-1'>
                                <InquiryCreateForm
                                    senderRole={senderRole}
                                    onSuccess={() => setViewMode('list')}
                                />
                            </div>
                        )}

                        {viewMode === 'chat' && selectedRoom && (
                            <InquiryChat
                                roomId={selectedRoom.id}
                                senderRole={senderRole}
                            />
                        )}
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
}