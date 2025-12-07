import { LucideCalendar, LucideClock2 } from 'lucide-react';

export function DateTime({ dateValue }: { dateValue: Date | string }) {
  const date = new Date(dateValue);
  return (
    <div className="flex items-center tabular-nums">
      <LucideCalendar size={18} className=" text-gray-400 mr-1" />

      {date?.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })}
      <LucideClock2 size={18} className=" text-gray-400 ml-4 mr-1" />
      {date?.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
}
