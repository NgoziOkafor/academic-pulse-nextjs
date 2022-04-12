import { serialize } from 'cookie';
import { deleteSessionByToken } from '../util/database';

export default function Logout() {
  window.location.replace('/');
  return 'Logged out';
}

export async function getServerSideProps(context) {
  // 1. get the cookie from the contex and get the session token
  const token = context.req.cookies.sessionToken;
  await deleteSessionByToken(token);
  console.log(token);

  // 2. Delete session from DB
  // const session = await removeSessionBytoken(token)
  context.res.setHeader(
    'Set-Cookie',
    serialize('sessionToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );
  // 3. Set the cookie destructio
  // 4 redirect user to home page

  return { props: {} };
}
