import type { Metadata } from "next";
import { getNewsList } from "@/features/posts/components/postNewsList";
import NewsList from "@/components/ui/NewsList";

export const metadata: Metadata = {
  title: "お知らせ｜demoサイト",
  description: "demoサイト、お知らせのdescriptionです。",
};

export default async function News() {
  const newsItems = await getNewsList();

  return (
    <main>
      <section className="py-10 px-5">
        <h1 className="text-3xl font-bold text-center mb-5">お知らせ</h1>
        <NewsList items={newsItems} />
      </section>
    </main>
  );
}
