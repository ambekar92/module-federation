export interface EmailSearchLayoutProps {
  searchName: string
  placeholder: string
}

export type InboxItem = {
  uuid: string
  subject: string
  sender: string // currently api returns as string, should be object [mdev]
  sent_at: string
  total_unread: number | string
  last_message: string
  read: boolean
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
  next: boolean
  previous: string | boolean
  results: InboxItem[]
}
