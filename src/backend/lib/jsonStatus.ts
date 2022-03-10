const httpStatus: HttpStatus = {
  // 1xx Informational 
  100: "Continue", 101: "Switching Protocols", 102: "Processing", 103: "Early Hints",
  // 2xx Success 
  200: "Ok", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used",
  // 3xx Redirection 
  300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect",
  // 4xx Client Error 
  400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Too Early", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 444: "Connection Closed Without Response", 451: "Unavailable For Legal Reasons", 499: "Client Closed Request",
  // 5xx Server Error 
  500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 510: "Not Extended", 511: "Network Authentication Required", 599: "Network Connect Timeout Error",
}

interface HttpStatus { 100: string, 101: string, 102: string, 103: string, 200: string, 201: string, 202: string, 203: string, 204: string, 205: string, 206: string, 207: string, 208: string, 226: string, 300: string, 301: string, 302: string, 303: string, 304: string, 305: string, 307: string, 308: string, 400: string, 401: string, 402: string, 403: string, 404: string, 405: string, 406: string, 407: string, 408: string, 409: string, 410: string, 411: string, 412: string, 413: string, 414: string, 415: string, 416: string, 417: string, 418: string, 421: string, 422: string, 423: string, 424: string, 425: string, 426: string, 428: string, 429: string, 431: string, 444: string, 451: string, 499: string, 500: string, 501: string, 502: string, 503: string, 504: string, 505: string, 506: string, 507: string, 508: string, 510: string, 511: string, 599: string }

export default function jsonStatus(code: keyof HttpStatus, message?: any) {
  return {
    "statusCode": code,
    "message": message || httpStatus[code]
  }
}
