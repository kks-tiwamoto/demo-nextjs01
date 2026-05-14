import { client } from "@/features/posts/api/microcms";

export type MicroCMSNewsDetail = {
  id: string;
  publishedAt: string;
  title: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  linkType: string[];
  linkUrl?: string;
  description?: string;
  detail?: string;
  dateTime: string;
  formattedDate: string;
};

export function formatDateTime(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDateText(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export async function getNewsDetail(id: string): Promise<MicroCMSNewsDetail> {
  const data = await client.get({
    endpoint: "news",
    contentId: id,
  });

  return {
    ...data,
    dateTime: formatDateTime(data.publishedAt),
    formattedDate: formatDateText(data.publishedAt),
  };
}

export async function getNewsDetailParams() {
  const data = await client.get({
    endpoint: "news",
    queries: {
      fields: "id",
    },
  });

  return data.contents.map((item: { id: string }) => ({
    id: item.id,
  }));
}
