import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsDetail, getNewsDetailParams } from "@/features/posts/components/postNewsDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return await getNewsDetailParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getNewsDetail(id);

  return {
    title: `${post.title}｜お知らせ｜demoサイト`,
    description: post.description || `${post.title}の詳細ページです。`,
  };
}

export default async function NewsDetail({ params }: Props) {
  const { id } = await params;
  const post = await getNewsDetail(id);

  if (!post.linkType?.includes("詳細ページリンク")) {
    notFound();
  }

  return (
    <main>
      <section className="py-10 px-5">
        <time dateTime={post.dateTime} className="block text-lg text-center mb-2">{post.formattedDate}</time>
        <h1 className="text-3xl font-bold text-center mb-5">{post.title}</h1>
        <div className="max-w-screen-xl mx-auto">
          {post.thumbnail && (
            <div className="flex justify-center">
              <Image
                src={post.thumbnail.url}
                width={post.thumbnail.width}
                height={post.thumbnail.height}
                alt={`${post.title}のサムネイル画像`}
              />
            </div>
          )}
          {post.detail && (
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: post.detail }}
            />
          )}
        </div>
        <div className="flex justify-center mt-5">
          <Link href="/news" className="inline-block p-5 bg-blue-500/25">お知らせ一覧へ戻る</Link>
        </div>
      </section>
    </main>
  );
}
