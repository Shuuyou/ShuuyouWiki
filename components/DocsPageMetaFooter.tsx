import { DiscussionPlaceholder } from '@/components/DiscussionPlaceholder';

interface DocsPageMetaFooterProps {
  updatedAt?: string;
  contributors?: string[];
  license?: string;
  discussionEnabled?: boolean;
  discussionUrl?: string;
}

function formatUpdatedAt(input?: string) {
  if (!input) return '未标注';

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function DocsPageMetaFooter({
  updatedAt,
  contributors,
  license,
  discussionEnabled,
  discussionUrl,
}: DocsPageMetaFooterProps) {
  const contributorText = contributors && contributors.length > 0 ? contributors.join(', ') : 'shuuyou';

  return (
    <footer className="mt-10 border-t border-black pt-6 dark:border-white">
      <div className="grid gap-3 text-sm md:grid-cols-3">
        <p>
          <span className="font-semibold">最后更新：</span>
          {formatUpdatedAt(updatedAt)}
        </p>
        <p>
          <span className="font-semibold">贡献者：</span>
          {contributorText}
        </p>
        <p>
          <span className="font-semibold">协议：</span>
          {license || 'CC BY-SA 4.0'}
        </p>
      </div>

      <DiscussionPlaceholder enabled={discussionEnabled} discussionUrl={discussionUrl} />
    </footer>
  );
}
