import { getNewsList } from "@/features/posts/components/postNewsList";
import NewsList from "@/components/ui/NewsList";

export default async function Home() {
  const newsItems = await getNewsList(3);

  return (
    <main>
      <section className="py-10 px-5">
        <h1 className="text-3xl font-bold text-center mb-5">トップページ</h1>
        <h2 className="text-2xl font-bold mb-5">お知らせ</h2>
        <NewsList items={newsItems} />
      </section>
    </main>
  );
}
