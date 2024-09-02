import { cn } from '@/utils/styles'

type LoadingSkeletonProps = {
  className?: string
  style?: React.CSSProperties
}

function LoadingSkeleton({
  className = '',
  style = {}
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-300 h-10 w-10', className)}
      style={style}
    >
    </div>
  )
}

export { LoadingSkeleton }