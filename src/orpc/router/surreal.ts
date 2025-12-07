import { dev, pub } from '@/orpc';
import { getDb } from '@/lib/surrealdb';
import { z } from 'zod';

export const getUsers = pub
  // .use(dev)
  .input(z.object({ order: z.string().default('asc') }))
  .handler(async ({ context, input }) => {
    const db = await getDb();
    await db.signin({
      namespace: 'test',
      //database: 'des',

      username: 'james',
      password: 'VJpo@aG7etWw3P',
    });

    let u = await db.query<{ id: string }[][]>(
      ` select id,firstName,email,age,lastName,notes,createdDate from user order by firstName ` +
        (input.order === 'asc' ? 'asc' : 'desc')
    );
    //console.log('user:', u[0]);
    let res = u[0].map((user) => ({ ...user, id: user.id.toString() }));
    console.log({ res });
    return res;
  });

export const getGeneratedDocuments = pub
  // .use(dev)
  .input(z.object({ order: z.string().default('asc') }))

  .handler(async ({ context, input }) => {
    const db = await getDb();
    await db.signin({
      namespace: 'test',
      //database: 'des',

      username: 'james',
      password: 'VJpo@aG7etWw3P',
    });

    let u = await db.query(
      ' select key,createdDate,notes from generatedDocuments order by createdDate ' +
        (input.order === 'asc' ? 'asc' : 'desc')
    );
    console.log(u[0]);
    return u[0];
  });
