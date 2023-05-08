export interface SuccessResponse<T> {
  success: { 
    message: string; 
    data: T;
  };
}


export interface ErrorResponse<T> {
  error: { 
    message: string; 
    data: T;
  };
}

export interface TableResponse<T> {
  data: T[];
  to: number; 
  from: number; 
  total: number; 
  perPage: number; 
  lastPage: number; 
  currentPage: number;
}