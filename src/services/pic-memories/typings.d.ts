declare namespace API {
  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    description?: string;
    message?: string;
  };

  type BaseResponseListWallpaper_ = {
    code?: number;
    data?: Wallpaper[];
    description?: string;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    description?: string;
    message?: string;
  };

  type BaseResponsePageWallpaper_ = {
    code?: number;
    data?: PageWallpaper_;
    description?: string;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    description?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    description?: string;
    message?: string;
  };

  type Code2Session = {
    openid?: string;
    session_key?: string;
  };

  type getCurrentUserUsingGETParams = {
    openid?: string;
    session_key?: string;
  };

  type getPageByTypeUsingGETParams = {
    /** searchType */
    searchType: number;
  };

  type getTagsByUrlUsingGETParams = {
    /** url */
    url?: string;
  };

  type getUserByUrlUsingGET1Params = {
    /** url */
    url?: string;
  };

  type getUserByUrlUsingGETParams = {
    /** url */
    url?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'CONTINUE'
      | 'SWITCHING_PROTOCOLS'
      | 'PROCESSING'
      | 'CHECKPOINT'
      | 'OK'
      | 'CREATED'
      | 'ACCEPTED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NO_CONTENT'
      | 'RESET_CONTENT'
      | 'PARTIAL_CONTENT'
      | 'MULTI_STATUS'
      | 'ALREADY_REPORTED'
      | 'IM_USED'
      | 'MULTIPLE_CHOICES'
      | 'MOVED_PERMANENTLY'
      | 'FOUND'
      | 'MOVED_TEMPORARILY'
      | 'SEE_OTHER'
      | 'NOT_MODIFIED'
      | 'USE_PROXY'
      | 'TEMPORARY_REDIRECT'
      | 'PERMANENT_REDIRECT'
      | 'BAD_REQUEST'
      | 'UNAUTHORIZED'
      | 'PAYMENT_REQUIRED'
      | 'FORBIDDEN'
      | 'NOT_FOUND'
      | 'METHOD_NOT_ALLOWED'
      | 'NOT_ACCEPTABLE'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUEST_TIMEOUT'
      | 'CONFLICT'
      | 'GONE'
      | 'LENGTH_REQUIRED'
      | 'PRECONDITION_FAILED'
      | 'PAYLOAD_TOO_LARGE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'URI_TOO_LONG'
      | 'REQUEST_URI_TOO_LONG'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'EXPECTATION_FAILED'
      | 'I_AM_A_TEAPOT'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'METHOD_FAILURE'
      | 'DESTINATION_LOCKED'
      | 'UNPROCESSABLE_ENTITY'
      | 'LOCKED'
      | 'FAILED_DEPENDENCY'
      | 'TOO_EARLY'
      | 'UPGRADE_REQUIRED'
      | 'PRECONDITION_REQUIRED'
      | 'TOO_MANY_REQUESTS'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'INTERNAL_SERVER_ERROR'
      | 'NOT_IMPLEMENTED'
      | 'BAD_GATEWAY'
      | 'SERVICE_UNAVAILABLE'
      | 'GATEWAY_TIMEOUT'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'VARIANT_ALSO_NEGOTIATES'
      | 'INSUFFICIENT_STORAGE'
      | 'LOOP_DETECTED'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'NOT_EXTENDED'
      | 'NETWORK_AUTHENTICATION_REQUIRED';
    view?: View;
    viewName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageWallpaper_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Wallpaper[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type User = {
    avatar?: string;
    createTime?: string;
    isDelete?: number;
    password?: string;
    phone?: string;
    updateTime?: string;
    userId?: number;
    userRole?: number;
    username?: string;
  };

  type UserLoginRequest = {
    code?: string;
    password?: string;
    username?: string;
  };

  type UserRegisterRequest = {
    password?: string;
    phone?: string;
    username?: string;
  };

  type userUpdateUsingPOSTParams = {
    openid?: string;
    session_key?: string;
  };

  type View = {
    contentType?: string;
  };

  type Wallpaper = {
    createTime?: string;
    downloads?: number;
    isDelete?: number;
    likes?: number;
    status?: number;
    tags?: string;
    type?: number;
    updateTime?: string;
    uploadDate?: string;
    userId?: number;
    wallpaperDescription?: string;
    wallpaperId?: number;
    wallpaperName?: string;
    wallpaperUrl?: string;
  };
}
