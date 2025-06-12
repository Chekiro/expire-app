export const getStatusColor = (expiry: string): string => {
  const now = new Date();
  const exp = new Date(expiry);
  const diffTime = exp.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return ""; 
  if (diffDays < 14) return "bg-red-200";
  if (diffDays <= 60) return "bg-yellow-200"; 
  return "bg-green-200"; 
};
