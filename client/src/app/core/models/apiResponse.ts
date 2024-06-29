export interface ApiResponse{
  statusCode:number;
  data:any;
  message:string;
  success:boolean;
}

export interface ApiError{
  status:number;
  errormessage:string;
}
