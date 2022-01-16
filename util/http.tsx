// import axios from "axios";
// const url = process.env.NEXT_PUBLIC_VERCEL_URL
//   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL }/api`
//   : "http://localhost:3000/api";

// const http = axios.create({
//   baseURL: url,
// });

// export default http;

export async function http(
  request: RequestInfo,
  config?: RequestInit
): Promise<any> {
  const response = await fetch(request, config);
  const body = await response.json();
  return body;
}
