import { getSessionByToken, getUserById } from '../util/database';

export async function auth(token) {
  if (token !== null) {
    const session = await getSessionByToken(token);
    if (session) {
      const expiryTime = session.expiry_timestamp.getTime();
      const now = new Date().getTime();
      if (expiryTime < now) {
        return false;
      } else {
        const user = await getUserById(session.userId);

        if (user && user.hasOwnProperty('created_at')) {
          delete user['created_at'];
        }

        return {
          props: {
            user: user,
            token: token,
          },
        };
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function relocate() {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
