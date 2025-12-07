import { prisma } from '@/lib/db';
import { dev, pub } from '@/orpc';
import z from 'zod';

export const consultations = pub
  .use(dev)
  .input(z.object({ caseNumber: z.number().min(200000) }))
  .handler(async ({ input, context }) => {
    console.log('Fetching consultations for case number:', input.caseNumber);
    console.log(context.token);

    return [];
  });
