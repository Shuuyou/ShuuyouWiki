import Link from 'next/link';

interface DiscussionPlaceholderProps {
  enabled?: boolean;
  discussionUrl?: string;
}

export function DiscussionPlaceholder({ enabled = false, discussionUrl }: DiscussionPlaceholderProps) {
  if (!enabled) {
    return (
      <div className="mt-4 border border-black p-4 text-sm leading-7 dark:border-white">
        评论区暂未开放哦~如果你有任何想法或建议，欢迎前往仓库提出Issues！
        <div className="mt-2">
          <Link href="https://github.com/Shuuyou/ShuuyouWiki" className="underline decoration-1 underline-offset-4">
            Github仓库
          </Link>
        </div>
      </div>
    );
  }

  if (discussionUrl) {
    return (
      <div className="mt-4 border border-black p-4 text-sm leading-7 dark:border-white">
        评论区已启用，你可以前往
        {' '}
        <Link href={discussionUrl} className="underline decoration-1 underline-offset-4">
          讨论页
        </Link>
        {' '}
        参与交流。
      </div>
    );
  }

  return (
    <div className="mt-4 border border-black p-4 text-sm leading-7 dark:border-white">
      评论区配置已开启，但尚未绑定讨论地址。
    </div>
  );
}
