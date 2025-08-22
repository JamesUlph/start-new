import { caseQuery } from '@/functions/get-case-data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function CaseDataCard({ caseNumber }: { caseNumber: number }) {
  const caseData = useSuspenseQuery(caseQuery(caseNumber));

  return (
    <div>
      {JSON.stringify(caseData)}

      <label>{caseData?.data.caseNumber}</label>
    </div>
  );
}
