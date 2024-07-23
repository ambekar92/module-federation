export type InboxItem = {
    uuid: string
    subject: string
    sender: Sender,
    sent_at: string
    total_unread: number
    last_message: string
  }
  export type Sender = {
    display_name: string,
    is_user: boolean
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
    previous: boolean
    results: InboxItem[]
  }