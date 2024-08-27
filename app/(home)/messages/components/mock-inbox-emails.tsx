import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { InboxResponse } from '@/app/services/types/communication-service/Inbox';

export const mock_inbox_emails = {
  'links': {
    'next': null,
    'previous': null
  },
  'pagination': {
    'previous_page': null,
    'current_page': 1,
    'next_page': 1,
    'page_size': 50
  },
  'count': 300,
  'total_pages': 2,
  'next': true,
  'previous': false,
  'results': populateResults()
}

function populateResults() {
  const res = []
  for (let i = 0; i < 300; i++) {
    const uuid = `uuid-${i + 1}`;
    const subject = `Subject ${i + 1}`;
    const displayName = `Sender ${i + 1}`;
    const sentAt = new Date().toISOString();
    const totalUnread = 1;
    const lastMessage = `This is the last message for item ${i + 1}.`;

    res.push({
      uuid,
      subject,
      sender: {
        display_name: displayName,
        is_user: false
      },
      sent_at: sentAt,
      total_unread: totalUnread,
      last_message: lastMessage
    });
  }

  return res;

}

// mockEmails()

export function useMockInboxEmails() {
  const [data, setData] = useState<InboxResponse>(mock_inbox_emails)
  const [isLoading, setIsLoading] = useState(false);

  return { data, isLoading}
}

// function mockEmails() {
//   for (const e of mock_inbox_emails.results) {
//     e.to = faker.internet.email();
//     e.last_message = faker.lorem.paragraph(30)
//   }
// }
