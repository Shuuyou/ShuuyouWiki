import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

// 实例化中文分词器
const tokenizer = await createTokenizer();

export const { GET } = createFromSource(source, {
  // 🔴 核心修复：彻底删除 language 字段，仅保留 components
  components: {
    tokenizer: tokenizer, 
  },
});