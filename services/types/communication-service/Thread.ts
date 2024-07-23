export type Thread = {
    id: number;
    uuid: string;
    subject: string;
    messages: Array<{
      uuid: string;
      sender: {
        display_name: string;
        is_user: boolean;
      };
      sent_at: string;
      content: string;
    }>;
  }