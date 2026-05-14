import { client } from "@/features/posts/api/microcms";

export type MicroCMSPagePost = {
  id: string;
  title: string;
  detail?: string;
  path: string;
  slug: string;
};

export async function getPagePosts(): Promise<MicroCMSPagePost[]> {
  const data = await client.getAllContents({
    endpoint: "page",
    queries: {
      fields: "id,title,detail,path,slug",
    }
  });
  return data;
}