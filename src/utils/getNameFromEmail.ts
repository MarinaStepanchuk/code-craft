const getNameFromEmail = (email: string): string => `@${email.split('@')[0]}`;

export default getNameFromEmail;
