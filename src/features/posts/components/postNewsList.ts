import { getNewsPosts, MicroCMSNewsPost } from "@/features/posts/api/news";

type NewsListItem = {
  id: string;
  title: string;
  date: string;
  href: string;
  blank?: boolean;
  thumbnail?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
};

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function mapNews(post: MicroCMSNewsPost): NewsListItem {
  let href = "";
  let blank = false;

  if (post.linkType?.includes("詳細ページリンク")) {
    href = `/news/${post.id}`;
  } else if (post.linkType?.includes("URLリンク")) {
    href = post.linkUrl ?? "";
  } else if (post.linkType?.includes("URLリンク（外部リンク）")) {
    href = post.linkUrl ?? "";
    blank = true;
  }

  return {
    id: post.id,
    title: post.title,
    date: formatDate(post.publishedAt),
    href,
    blank,
    thumbnail: post.thumbnail?.url,
    thumbnailWidth: post.thumbnail?.width,
    thumbnailHeight: post.thumbnail?.height,
  };
}

export async function getNewsList(limit?: number) {
  const posts = await getNewsPosts();
  const items = posts.map(mapNews);

  return limit ? items.slice(0, limit) : items;
}