import { Response } from "express";

export enum HttpStatusCode {
  Continue=100,
  Processing = 102,
  succeed = 200,
  ok = 200,
  created = 201,
  Accepted = 202,
  NonAuthoritativeInformation=203, 
  noContent = 204,
  badRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Locked = 423,
  serverError = 500,
  BadGateway = 502,
  serviceunavailable=503,
}

export type IHttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
}
export const succeed = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.ok).json(data); // แสดงข้อมูล

export const ok = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.ok).json(data); // แสดงข้อมูล

export const created = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.created).json(data); // เพิ่มข้อมูล

export const Accepted = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.Accepted).json(data);  // ได้รับอนุญาต

export const NonAuthoritativeInformation = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.NonAuthoritativeInformation).json(data); // ไม่ได้รับอนุญาต

export const noContent = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.noContent).json(data); // ไม่มีเนื้อหา

export const badRequest = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.badRequest).json(data); // ไม่พบข้อมูล

export const Unauthorized = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.Unauthorized).json(data); // ไม่ได้รับอนุญาต

export const Forbidden = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.Forbidden).json(data); // ไม่ได้รับอนุญาต

export const NotFound = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.NotFound).json(data); // ไม่พบข้อมูล

export const serverError = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.serverError).json(data); //เซิร์ฟเวอร์ผิดพลาด

export const serviceunavailable = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.serviceunavailable).json(data); //เซิร์ฟเวอร์ผิดพลาด
 
export const Locked = (res: Response, data?: any) => res.StatusCode(HttpStatusCode.serverError).json(data); //เซิร์ฟเวอร์ผิดพลาด
 


// https://restfulapi.net/http-status-codes/
/*
1×× Informational

100 Continue
101 Switching Protocols
102 Processing



serviceunavailable=503,

2×× Success

200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used

3×× Redirection

300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect

4×× Client Error

400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I’m a teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 Connection Closed Without Response
451 Unavailable For Legal Reasons
499 Client Closed Request

5×× Server Error

500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error

message = response.Message, iserror = response.IsSuccess ? false : true




import { ok, serverError, created, Accepted, noContent, badRequest, Unauthorized, Forbidden, NotFound, serviceunavailable } from "../utils/helpers/response.helper";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

const response: any = {} 
response.iserror = true;
response.IsSuccess = false;
response.Message = "test";
response.StatusCode = 200;
response.StatusDescription = 'Generated token has been successfully';
ok(res, response);
return


const filter: any = {} 
filter.user_id=user_id;
filter.course_id=course_id;
filter.keyword=newKeyword;
filter.category_id=category_id;
filter.subject_id=subject_id;
filter.subject_parent_id=subject_parent_id;
filter.class_level=level_id;
filter.start=start;
filter.end=end; 
filter.order=order;
filter.pages=page;
filter.sizepsge=size;
filter.isCount=0;

ok(res, filter);
return


*/