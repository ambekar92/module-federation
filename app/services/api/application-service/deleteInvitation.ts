import axios from 'axios';

export const deleteInvitation = async (invitationId: string) => {
  try {
    const response = await axios.delete(`/api/invitation?invitation_id=${invitationId}`);
    if (response.data.message === 'Invitation deleted successfully') {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.log('Invitation deleted successfully');
      }
    }
  } catch (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error deleting invitation:', error);
    }
  }
};
