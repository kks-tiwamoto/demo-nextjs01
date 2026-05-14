import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPageByPath, getAllPagePaths } from "@/features/posts/components/postPage";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateStaticParams() {
  const paths = await getAllPagePaths();
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageByPath(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title}｜demoサイト`,
    description: page.description || `${page.title}のページです。`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPageByPath(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <section className="py-10 px-5">
        <h1 className="text-3xl font-bold text-center mb-5">{page.title}</h1>
        {page.detail && (
          <div
            dangerouslySetInnerHTML={{ __html: page.detail }}
          />
        )}
      </section>
    </main>
  );
}
