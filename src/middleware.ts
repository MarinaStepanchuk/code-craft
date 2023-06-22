// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/me/publications', '/me/newpost/:id*', '/me/profile', '/me/bookmarks', 'me/feeds'],
};
