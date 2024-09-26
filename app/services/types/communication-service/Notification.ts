export interface INotification {
	id: number;
	message: string;
	subject: string | null;
	level: 'info' | 'warning' | 'error';
	unread: boolean;
	actor_object_id: string;
	verb: string;
	description: string | null;
	target_object_id: string | null;
	action_object_object_id: string | null;
	timestamp: string; 
	public: boolean;
	deleted: boolean;
	emailed: boolean;
	data: any; // not sure what this is - need to type once known [mdev]
	actor_content_type: number;
	target_content_type: number | null;
	action_object_content_type: number | null;
	recipient: number;
  };
  
