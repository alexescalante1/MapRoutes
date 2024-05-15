export type MdlBaseResponse = {
  code: number;
  success: number;
  message: string;
  errors?: MdlErrorResponse[];
  data?: any
};

export type MdlErrorResponse = {
  code: number;
  message: string;
};
