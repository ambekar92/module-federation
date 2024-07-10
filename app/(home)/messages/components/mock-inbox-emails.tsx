import { useEffect, useState } from "react"
import { InboxResponse } from "../types"

export const mock_inbox_emails = {
    "links": {
      "next": "string",
      "previous": "string"
    },
    "pagination": {
      "previous_page": null,
      "current_page": 1,
      "next_page": 3,
      "page_size": 10
    },
    "count": 20,
    "total_pages": 5,
    "next": "string",
    "previous": "string",
    "results": [
      {
        "uuid": "1",
        "subject": "Welcome to our service!",
        "sender": "service@example.com",
        "sent_at": "2023-04-01T12:00:00Z",
        "total_unread": "0",
        "read": false,
        "last_message": "We are glad you joined us."
      },
      {
        "uuid": "2",
        "subject": "Your subscription has been activated",
        "sender": "billing@example.com",
        "sent_at": "2023-04-02T15:30:00Z",
        "total_unread": "1",
        "read": true,
        "last_message": "Thank you for choosing our premium plan."
      },
      {
        "uuid": "3",
        "subject": "Feature Update",
        "sender": "updates@example.com",
        "sent_at": "2023-04-03T09:45:00Z",
        "total_unread": "2",
        "read": false,
        "last_message": "We have added new features to your experience."
      },
      {
        "uuid": "4",
        "subject": "Scheduled Maintenance",
        "sender": "support@example.com",
        "sent_at": "2023-04-04T16:00:00Z",
        "total_unread": "3",
        "read": false,
        "last_message": "Our service will be temporarily unavailable."
      },
      {
        "uuid": "5",
        "subject": "Survey Invitation",
        "sender": "feedback@example.com",
        "sent_at": "2023-04-05T14:20:00Z",
        "total_unread": "4",
        "read": false,
        "last_message": "We value your feedback."
      },
      {
        "uuid": "6",
        "subject": "Security Notice",
        "sender": "security@example.com",
        "sent_at": "2023-04-06T18:10:00Z",
        "total_unread": "5",
        "read": true,
        "last_message": "A new security update is available."
      },
      {
        "uuid": "7",
        "subject": "Account Activity Alert",
        "sender": "alerts@example.com",
        "sent_at": "2023-04-07T20:00:00Z",
        "total_unread": "6",
        "read": false,
        "last_message": "Unusual activity detected."
      },
      {
        "uuid": "8",
        "subject": "Weekly Newsletter",
        "sender": "newsletter@example.com",
        "sent_at": "2023-04-08T10:15:00Z",
        "total_unread": "7",
        "read": false,
        "last_message": "Catch up on the latest news."
      },
      {
        "uuid": "9",
        "subject": "Event Invitation",
        "sender": "events@example.com",
        "sent_at": "2023-04-09T13:00:00Z",
        "total_unread": "8",
        "read": false,
        "last_message": "You are invited to our annual event."
      },
      
    ]
  } as unknown as InboxResponse

  export function useMockInboxEmails() {
    const [data, setData] = useState<InboxResponse>(mock_inbox_emails)
    const [isLoading, setIsLoading] = useState(false);

    return { data, isLoading}
  }