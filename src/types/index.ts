export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type StoreState = {
  todosStore: {
    todos: Todo[];
    total: number;
  };
  usersStore: {
    users: User[];
    isLoading: boolean;
    error: string | null;
  };
};
