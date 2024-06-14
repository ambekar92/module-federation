export type IAction = {
    id: string;
    url: string;
    verb: string;
    published: string;
    actor: {
      id: string;
      url: string;
      objectType: string;
      displayName: string;
    };
    title: string;
    target: {
      id: string;
      url: string;
      objectType: string;
      displayName: string;
    };
  };

  export type ActivityResponse = {
    total_actions: number,
    actions: IAction[]

  }
  