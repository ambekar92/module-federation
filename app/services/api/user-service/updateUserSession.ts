import { User } from '../../types/user-service/User';

/**
 * Updates the user session in Okta.
 * @param user The user object from the Okta profile.
 * @returns A promise that resolves when the session is updated.
 */
async function updateUserSession(user: User) {
  if (!user.profile || !user.profile[0] || !user.profile[0].okta_id) {
    return;
  }

  try {
    const response = await fetch('/api/update-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update session: ${response.status} ${response.statusText}`);
    }
    window.location.reload();
  } catch (error) {
    // TODO: Handle error
  }
}

export { updateUserSession }
