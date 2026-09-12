export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type StoreState = {
  todosStore: {
    todos: Todo[];
    total: number;
  };
};
