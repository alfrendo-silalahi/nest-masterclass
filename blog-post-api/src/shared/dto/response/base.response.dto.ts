export default class BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
