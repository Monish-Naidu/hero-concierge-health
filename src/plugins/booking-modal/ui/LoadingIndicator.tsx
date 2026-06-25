"use client";

import React from "react";

interface LoadingIndicatorProps {
  text?: string;
}

export function LoadingIndicator({ text = "Loading..." }: LoadingIndicatorProps) {
  return (
    <div className="flex h-[200px] items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gradientFromBooking border-t-transparent"></div>
        <span className="text-lg font-medium text-gradientFromBooking">
          {text}
        </span>
      </div>
    </div>
  );
}
