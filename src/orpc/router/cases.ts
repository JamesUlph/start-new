import { dev, pub } from '@/orpc';
import { CaseData, GeneratedDocument } from '@/types/generated-document';
import { z } from 'zod';

// Define a Zod schema for CaseData for runtime validation
const CaseDataSchema = z.object({
  caseNumber: z.number(),
});

export const getCase = pub
  .use(dev)

  .input(z.object({ caseNumber: z.number().min(200000) }))

  .handler(async ({ input, context }) => {
    try {
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

      const rawResponse: unknown = await resp.json();

      // Validate the response against the Zod schema
      const validatedResponse = CaseDataSchema.parse(rawResponse);

      // Ensure the validated response matches the CaseData type
      const response: CaseData = validatedResponse;

      //await new Promise((resolve) => setTimeout(resolve, 1000));

      return response;
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
