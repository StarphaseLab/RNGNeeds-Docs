import { useAssetStoreLink } from '@/components/RLinks'

/**
 * Locale-aware Asset Store link.
 * zh-CN → u3d.cn (China store), everything else → global store.
 *
 * Usage in MDX:
 *   <AssetStoreLink>Get the Plugin</AssetStoreLink>
 *   <AssetStoreLink as={Button} arrow="right">Get the Plugin</AssetStoreLink>
 */
export function AssetStoreLink({ as: Component = 'a', children, ...props }) {
  let href = useAssetStoreLink()
  return (
    <Component href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Component>
  )
}
