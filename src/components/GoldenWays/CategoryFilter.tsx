import './CategoryFilter.css'

interface CategoryFilterProps<T extends string> {
  label: string
  options: readonly T[]
  selected: T
  onSelect: (option: T) => void
}

function CategoryFilter<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: CategoryFilterProps<T>) {
  return (
    <div className="category-filter" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="category-filter__chip"
          aria-pressed={option === selected}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter