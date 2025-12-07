import { prisma } from '@/lib/db';
import { dev, pub } from '@/orpc';
import z from 'zod/v4';

export const getMultimediaTypes = pub
  .use(dev)
  // .input(z.object({ id: z.string(), includeUrl: z.boolean() }))
  .handler(async ({ context }) => {
    // console.log('Fetching doc:', input.id);
    //console.log(context.token);

    const url = `https://devtoken.neoma.co.uk/V2/ReferenceData/GetMultimediaTypes`;

    const d = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    });

    const re = await d.json();

    console.log({ re });

    return re as {
      multimediaTypeId: string;
      description: string;
    }[];
  });
