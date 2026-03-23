import { useLocale } from '@/lib/locale'

export const DISCORD_LINK = "https://discord.gg/EghN9gFHmw";
export const REDDIT_LINK = "https://www.reddit.com/user/StarphaseLab";
export const TWITTER_LINK = "https://twitter.com/StarphaseLab";
export const SUPPORT_EMAIL = "support@starphase.sk";
export const SUPPORT_EMAIL_LINK = `mailto:${SUPPORT_EMAIL}`;
export const STARPHASELAB_LINK = "https://www.starphase.sk";

// Global Asset Store (all locales except zh-CN)
const ASSET_STORE_GLOBAL = "https://assetstore.unity.com/packages/slug/247024";
// China Asset Store (u3d.cn — separate store, separate payment)
const ASSET_STORE_CN = "https://assetstore.u3d.cn/packages/tools/utilities/assetstore-package-20003049";

/** @deprecated Use useAssetStoreLink() for locale-aware link */
export const ASSET_STORE_RNGNEEDS_LINK = ASSET_STORE_GLOBAL;

/** Hook: returns the correct Asset Store link for the current locale */
export function useAssetStoreLink() {
  let locale = useLocale()
  return locale === 'zh-CN' ? ASSET_STORE_CN : ASSET_STORE_GLOBAL
}
