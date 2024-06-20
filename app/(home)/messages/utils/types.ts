export interface EmailSearchLayoutProps {
  searchName: string
  placeholder: string
}

export interface Email {
  uuid: number
  //read: boolean
  //icon: JSX.Element
  sender: { display_name: string; is_user: boolean }
  sent_at: string
  subject: string
  last_message: string
  total_unread: string
}

export type InboxItem = {
  uuid: string
  subject: string
  sender: string | { display_name: string; is_user: boolean }
  sent_at: string
  total_unread: number | string
  last_message: string
}

export type InboxResponse = {
  links: {
    next: string | null
    previous: string | null
  }
  pagination: {
    previous_page: number | null
    current_page: number
    next_page: number | null
    page_size: number
  }
  count: number
  total_pages: number
  next: string | boolean
  previous: string | boolean
  results: [
    {
      uuid: string
      subject: string
      sender: { display_name: string; is_user: boolean }
      sent_at: string
      total_unread: number | string
      last_message: string
    },
  ]
}
