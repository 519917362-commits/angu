import {revalidateTag} from 'next/cache';
import {NextRequest} from 'next/server';
import {SITE_DATA_TAG} from '@/lib/api';

/**
 * 按需缓存失效接口 —— 由后端在管理后台数据变更后调用。
 *
 * 安全：调用方必须携带 REVALIDATE_SECRET（前后端共享密钥）。
 * 触发方式：POST /api/revalidate  body: {"secret": "...", "tag": "site-data"}
 * 缺省 tag 为 site-data（全站数据缓存）。
 */
export async function POST(req: NextRequest) {
  let body: {secret?: string; tag?: string} = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({error: 'Invalid JSON body'}, {status: 400});
  }

  const expected = process.env.REVALIDATE_SECRET;
  // 未配置密钥时拒绝所有请求（避免误开启公网失效入口）
  if (!expected) {
    return Response.json({error: 'Revalidation not configured'}, {status: 503});
  }
  if (body.secret !== expected) {
    return Response.json({error: 'Invalid secret'}, {status: 401});
  }

  const tag = body.tag || SITE_DATA_TAG;
  // Next.js 16: revalidateTag 需传 cache profile（'max' = 立即失效并重新拉取）
  revalidateTag(tag, 'max');
  return Response.json({revalidated: true, tag, now: new Date().toISOString()});
}
