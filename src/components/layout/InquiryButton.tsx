'use client';

import {MessageCircle} from 'lucide-react';

export function InquiryButton() {
  return (
    <a
      href="https://wa.me/8613812345678?text=Hello, I'm interested in your gabion box and protection net products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="hidden sm:inline font-medium text-sm">Chat on WhatsApp</span>
    </a>
  );
}
