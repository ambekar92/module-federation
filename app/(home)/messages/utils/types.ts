export interface EmailSearchLayoutProps {
	searchName: string;
	placeholder: string;
}

export interface Email {
  id: number;
  read: boolean;
  icon: JSX.Element;
  from: string;
	date: string;
  subject: string;
  message: string;
}
