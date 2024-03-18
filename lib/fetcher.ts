export const fetcher = (url: string) => fetch(url, { next: { revalidate: 1000 } }).then((res) => res.json());
