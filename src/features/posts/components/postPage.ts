import { client } from "@/features/posts/api/microcms";

export type MicroCMSPage = {
  id: string;
  title: string;
  detail?: string;
  description?: string;
  path: string;
  slug: string;
};

export async function getPageByPath(slugArray: string[]): Promise<MicroCMSPage | null> {
  const fullPath = `/${slugArray.join("/")}`;
  const lastSlashIndex = fullPath.lastIndexOf("/");
  const pathPart = fullPath.substring(0, lastSlashIndex + 1);
  const slugPart = fullPath.substring(lastSlashIndex + 1);

  try {
    const data = await client.get({
      endpoint: "page",
      queries: {
        filters: `path[equals]${pathPart}[and]slug[equals]${slugPart}`,
      },
    });

    return data.contents[0] || null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getAllPagePaths() {
  const data = await client.getAllContents({
    endpoint: "page",
    queries: {
      fields: "path,slug",
    },
  });

  return data.map((item: Pick<MicroCMSPage, "path" | "slug">) => {
    const fullPath = (item.path + item.slug).replace(/^\/|\/$/g, "");
    return {
      slug: fullPath.split("/"),
    };
  });
}
