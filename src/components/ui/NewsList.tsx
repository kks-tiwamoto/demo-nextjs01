import Link from "next/link";
import Image from "next/image";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  href: string;
  blank?: boolean;
  thumbnail?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
};

type Props = {
  items: NewsItem[];
};

export default function NewsList({ items }: Props) {
  function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  return (
    <div>
      <ul>
        {items.map((item) => {
          const LinkTag = item.blank ? "a" : Link;

          const linkProps = item.blank
            ? {
              href: item.href,
              target: "_blank",
              rel: "noopener noreferrer",
              }
            : {
              href: item.href,
            };

          return (
            <li key={item.id} className="mb-3">
              <LinkTag
                {...linkProps}
                className="flex items-start gap-x-5"
              >
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    className="block w-30 max-w-full shrink-0"
                    width={item.thumbnailWidth}
                    height={item.thumbnailHeight}
                    alt={`${item.title}のサムネイル画像`}
                  />
                )}
                <div className="flex-auto">
                  <time
                    dateTime={item.date}
                    className="inline-block text-sm mb-2"
                  >
                    {formatDate(item.date)}
                  </time>
                  <p className="text-xl">{item.title}</p>
                </div>
              </LinkTag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}