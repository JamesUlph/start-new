import { dev, pub } from '@/orpc';
import { z } from 'zod/v4';

const BASE_URL = 'https://devtoken.neoma.co.uk/QuickResolve';

export const getQuickResolveReferences = pub
  .use(dev)
  //  .input(z.object({ id: z.string(), includeUrl: z.boolean() }))
  .handler(async ({ input, context }) => {
    //console.log(context.token);

    const url = `${BASE_URL}/GetQuickResolveReferences`;

    const d = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      //   body: JSON.stringify({
      //     generatedDocumentId: input.id,
      //     includeUrl: input.includeUrl,
      //   }),
    });

    const re = await d.json();

    return re as {
      countryCodes: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      foodCodes: any[];
      temperatures: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      importTargets: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      importUses: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      documentChecks: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      releaseCodes: {
        referenceID: string;
        referenceCode: string;
        displayName: string;
        referenceTypeCode: string;
      }[];
      workgroups: { workgroupId: string; workgroupDescription: string }[];
    };
  });
