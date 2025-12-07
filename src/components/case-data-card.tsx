import { caseQuery } from '@/functions/get-case-data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function CaseDataCard({ caseData }: { caseData: any }) {
  //const caseData = useSuspenseQuery(caseQuery(caseNumber));

  if (caseData?.data.subType == 'Quick Resolve') {
    return (
      <div>
        Vessel:{caseData?.data.data.vesselName}{' '}
        <div className="flex">
          <div>
            <label className="font-semibold">Case type:</label>
            {caseData?.data.type}
          </div>
          <div>
            <label className="font-semibold">Case subtype:</label>
            {caseData?.data.subType}
          </div>
          <label className="font-semibold text-2xl">Case Detail</label>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <label className="font-semibold">Case type:</label>
        {caseData?.data.subType}
      </div>
      <label className="font-semibold">Case:{caseData?.data.caseNumber}</label>
      <div className="font-semibold">{caseData?.data.data.description}</div>
      <div className="flex">
        <div>{caseData?.data.type}</div>
        <div>{caseData?.data.subType}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 bg-gray-100 p-2">
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-2xl  font-semibold">Agent (IPAFFS)</h2>
          <div className="    grid grid-cols-4">
            {' '}
            <div>
              <label className="font-semibold">Address</label>
              <div>{caseData?.data.data.agentIpaffsAddressStreet}</div>
            </div>
            <div>
              <label className="font-semibold">Name</label>
              <div>{caseData?.data.data.agentIpaffsContactName}</div>
            </div>
            <div>
              <label className="font-semibold">Phone</label>
              <div>{caseData?.data.data.agentIpaffsContactPhone}</div>
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <div className="line-clamp-2">
                {caseData?.data.data.agentIpaffsContactEmail}
              </div>
            </div>
            <div>{caseData?.data.data.agentIpaffsAddressPostCode}</div>
          </div>
        </div>
        <div className=" bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold">Invoice Agent (NEOMA)</h2>
          <div>{caseData?.data.data.agentNeomaContactEmail}</div>
          <div>{caseData?.data.data.agentNeomaOrganisationName}</div>
          <div>{caseData?.data.data.agentNeomaAddressLine1}</div>
          <div>{caseData?.data.data.agentNeomaAddressLine2}</div>
          <div>{caseData?.data.data.agentNeomaAddressLine3}</div>
          <div>{caseData?.data.data.agentNeomaAddressLine4}</div>
          <div>{caseData?.data.data.agentNeomaAddressLine5}</div>
          <div>{caseData?.data.data.agentNeomaAddressPostCode}</div>
        </div>
        <div className=" bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold">Importer</h2>
          <div>{caseData?.data.data.importerOrganisationName}</div>
          <div>{caseData?.data.data.importerAddressStreet}</div>
          <div>{caseData?.data.data.importerAddressCity}</div>
          <div>{caseData?.data.data.importerAddressPostCode}</div>
        </div>
      </div>

      {/* {JSON.stringify(caseData)} */}
    </div>
  );
}
