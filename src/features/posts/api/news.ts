import { client } from "@/features/posts/api/microcms";

export type MicroCMSNewsPost = {
  id: string;
  publishedAt: string;
  title: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  }
  detail?: string;
  linkType: string[];
  linkUrl?: string;
  description?: string;
};

export async function getNewsPosts(): Promise<MicroCMSNewsPost[]> {
  const data = await client.getAllContents({
    endpoint: "news",
    queries: {
      fields: "id,publishedAt,title,thumbnail,detail,linkType,linkUrl,description",
      orders: "-publishedAt",
    }
  });
  return data;
}