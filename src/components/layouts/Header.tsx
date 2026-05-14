import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-500/10">
      <div className="flex items-center justify-between p-10">
        <h1><Link href="/" className="text-3xl font-bold">demoサイト</Link></h1>
        <nav>
          <ul className="flex gap-x-5 items-center">
            <li><Link href="/">ホーム</Link></li>
            <li><Link href="/news">お知らせ</Link></li>
            <li><Link href="/product">製品TOP</Link></li>
            <li><Link href="/product/sample01">製品サンプル01</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}