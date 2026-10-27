import type { ISelectOptionsProps } from '@/interfaces/ui/select-options'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

export function SelectOptions({
  options,
  value,
  onValueChange,
  className,
  ...props
}: ISelectOptionsProps) {
  return (
    <Select value={value} onValueChange={onValueChange} items={options}>
      <SelectTrigger className={className} {...props}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
