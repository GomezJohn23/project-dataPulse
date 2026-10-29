import type { FeedKind } from '../../types/feed'
import './FeedFilter.css'

type FeedFilterProps = {
  value: FeedKind
  onChange: (feed: FeedKind) => void
}

const FEED_OPTIONS: { id: FeedKind; label: string }[] = [
  { id: 'top', label: 'Top' },
  { id: 'new', label: 'New' },
  { id: 'jobs', label: 'Jobs' },
]

/**
 * Selector de feed: Top / New / Jobs.
 */
function FeedFilter({ value, onChange }: FeedFilterProps) {
  return (
    <div className="feed-filter" role="group" aria-label="Tipo de feed">
      {FEED_OPTIONS.map((option) => {
        const isActive = option.id === value

        return (
          <button
            key={option.id}
            type="button"
            className={
              isActive
                ? 'feed-filter__button feed-filter__button_active'
                : 'feed-filter__button'
            }
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default FeedFilter