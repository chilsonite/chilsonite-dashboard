export const fetchEnvMutator = async <T>(
  input: string,
  init: RequestInit = {}
): Promise<T> => {
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser
    ? input
    : new URL(input, process.env.CICADA_API_URL ?? "").toString();

  // デフォルトオプションをマージ (credentials: 'include' を強制適用)
  const mergedInit: RequestInit = {
    credentials: "include", // すべてのリクエストでクッキーを送信
    ...init, // 呼び出し元の設定をマージ
    headers: {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    },
  };

  // fetch 実行
  const res = await fetch(url, mergedInit);
  if (!res.ok) {
    console.error("Request failed:", res.status, res.statusText);
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as T;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return {
    data,
    status: res.status,
  };
};
export default fetchEnvMutator;
