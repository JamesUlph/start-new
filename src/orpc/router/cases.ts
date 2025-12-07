import { dev, pub } from '@/orpc';
import { GeneratedDocument } from '@/types/generated-document';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { raw } from '@prisma/client/runtime/client';

// Define a Zod schema for CaseData for runtime validation
const CaseDataSchema = z.object({
  caseNumber: z.number(),
  caseId: z.string(),
  data: z.object({
    consultation: z.any().optional(),
    documentReferenceNumber: z.string().optional(),
    importerOrganisationName: z.string().optional(),
  }),
});

// create type
type CaseData = z.infer<typeof CaseDataSchema>;

export const newCases = pub
  .use(dev)
  .input(z.object({ caseNumber: z.number().min(200000) }))
  .handler(async ({ input, context }) => {
    let cases = await prisma.case.findMany({
      where: { CaseNumber: input.caseNumber },
      include: {
        CaseType: true,
        Consultation: { include: { generatedDocuments: true } },
      },
    });

    console.log('New Cases:', JSON.stringify(cases, null, 2));

    return cases;
  });

export const addDoc = pub.use(dev).handler(async () => {
  console.log('Adding document...');
  try {
    let r = await prisma.generatedDocuments.create({
      data: {
        Title: 'New Document',
        GeneratedDocumentTypeId: '758892f1-6098-46f6-bce3-326a06803182',
        UserFields: '[]',

        ParentId: '037dbca0-eb77-49f8-9883-babdbf9a6c98',
      },
    });
    return {};
  } catch (e) {
    console.error('Error adding document:', e);
    throw e;
  }
});

export const getCase = pub
  .use(dev)

  .input(z.object({ caseNumber: z.number().min(200000) }))

  .handler(async ({ input, context }) => {
    try {
      //console.log(context.db);

      console.log('PRISMA-------');

      let cases = await prisma.case.findMany({
        where: { CaseNumber: input.caseNumber },
        include: {
          CaseType: true,
          Consultation: { include: { generatedDocuments: true } },
        },
      });

      console.log(JSON.stringify(cases, null, 2));

      const resp = await fetch(
        'https://devtoken.neoma.co.uk/CaseV3/case/GetCaseData',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${context.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            caseNumber: input.caseNumber,
          }),
        }
      );

      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(
          `API request failed with status ${resp.status}: ${errorText}`
        );
      }

      const rawResponse: CaseData = await resp.json();

      // console.log({ raw: rawResponse, caseNumber: input.caseNumber });

      // Validate the response against the Zod schema
      //const validatedResponse = CaseDataSchema.parse(rawResponse);

      // Ensure the validated response matches the CaseData type
      //const response: CaseData = validatedResponse as CaseData;

      //await new Promise((resolve) => setTimeout(resolve, 1000));

      return rawResponse;
    } catch (error) {
      console.error('Error fetching or parsing case data:', error);
      // Re-throw the error or return a specific error object that ORPC can handle
      throw new Error(
        `Failed to retrieve case data: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  });
