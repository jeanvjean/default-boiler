export const generateUniquePassword = () => `${Math.random().toString(32).substr(2, 9)}`;
