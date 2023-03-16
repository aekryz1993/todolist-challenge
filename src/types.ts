export interface ErrorResponse {
  data: any;
  status: number;
  statusText?: string;
  message?: string;
};

export interface TUser {
  id: string;
  email: string
}

export interface TTodo {
  id: string;
  title: string
  description?: string
  endDate?: string
  completed: boolean
  userId?: string
  pos: number
  todoId?: string;
}
