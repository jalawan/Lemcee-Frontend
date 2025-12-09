export const sendNotification = async (user: { first_name: string; email: string }, message: string) => {
  // For now, just log to console
  console.log(`Notification to ${user.first_name} (${user.email}): ${message}`);
};
