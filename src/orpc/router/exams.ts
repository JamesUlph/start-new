import { prisma } from '@/lib/db';
import { dev, pub } from '@/orpc';
import z from 'zod/v4';

const BASE_URL = `https://devtoken.neoma.co.uk/V2/Examination`;

export const getExams = pub
  .use(dev)
  // .input(z.object({ id: z.string(), includeUrl: z.boolean() }))
  .handler(async ({ context }) => {
    // console.log('Fetching doc:', input.id);
    //console.log(context.token);

    const url = `${BASE_URL}/GetExams`;

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
      examinationRecordId: string;
      bay: string;
      unitId: string;
      examinationType: string;
      facility: string;
      calledDate: string;
      status: string;
    }[];
  });

export const getMultimedia = pub
  .use(dev)
  .input(z.object({ id: z.string() }))
  .handler(async ({ context, input }) => {
    // console.log('Fetching doc:', input.id);
    //console.log(context.token);

    const url = `${BASE_URL}/GetMultimedia/${input.id}`;

    console.log('fetching:', url);

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
      multimediaId: string;
      thumbnailKey: string;
      fileKey: string;
      mediaDescription: string;
      associatedTypeId: string;
    }[];
  });

export const getComments = pub
  .use(dev)
  .input(z.object({ id: z.string() }))
  .handler(async ({ context, input }) => {
    // console.log('Fetching doc:', input.id);
    //console.log(context.token);

    const url = `${BASE_URL}/GetComments?ExaminationRecordId=${input.id}`;

    console.log('fetching:', url);

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
      commentId: string;
      commentType: string;
      officer: string;
      commentDateTime: string;
    }[];
  });
