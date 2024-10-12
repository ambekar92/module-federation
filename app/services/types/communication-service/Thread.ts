export type Thread = {
    uuid: string;
    subject: string;
    messages: Array<{
			id: number;
      uuid: string;
			sent_at: string;
      content: string;
      sender: number;
			thread: number;
    }>;
  }
