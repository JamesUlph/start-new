import { dev, pub } from '@/orpc';
import z from 'zod/v4';
import { S3Client, GetObjectCommand, getobject } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getBucketImage = pub
  //.use(dev)
  .input(z.object({ bucket: z.string(), fileKey: z.string() }))
  .handler(async ({ context, input }) => {
    console.log('getBucketImage');

    const s3 = new S3Client({ region: 'eu-west-2' });

    const command = new GetObjectCommand({
      Bucket: input.bucket,
      Key: input.fileKey,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    //await new Promise((resolve) => setTimeout(resolve, 1000));

    return { url };
  });

export const getBucketMetadata = pub
  //.use(dev)
  .input(z.object({ bucket: z.string(), fileKey: z.string() }))
  .handler(async ({ context, input }) => {
    console.log('getMeta');

    const s3 = new S3Client({ region: 'eu-west-2' });

    const command = new GetObjectCommand({
      Bucket: input.bucket,
      Key: input.fileKey,
    });

    const data = await s3.send(command);

    //await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    return { meta: data.Metadata || {} };
  });
