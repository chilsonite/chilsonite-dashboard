import { cookie } from "@lazarv/react-server";

/**
 * Cookieヘッダー文字列を生成するユーティリティ関数
 * @returns Cookie文字列 (例: "key1=value1; key2=value2")
 */
export function getCookieHeader(): string {
  const cookies = cookie();
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}
