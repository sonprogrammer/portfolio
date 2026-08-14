export type ApiRes<T> = 
  | { success: true; data: T; message?: string }    
  | { success: false; data?: never; message: string };