import Link from 'next/link';

interface DiscussionPlaceholderProps {
  enabled?: boolean;
  discussionUrl?: string;
}

export function DiscussionPlaceholder({ enabled = false, discussionUrl }: DiscussionPlaceholderProps) {
  if (!enabled) {
    return (
      <div className="mt-4 border border-black p-4 text-sm leading-7 dark:border-white">
        评论区暂未开放。当前阶段以内容建设和结构稳定为主，后续将按计划开放讨论与反馈。
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
