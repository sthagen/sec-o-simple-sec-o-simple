import VSplit from '@/components/forms/VSplit'
import { Input, Textarea } from '@heroui/input'
import { PropsWithChildren } from 'react'
import { TProductTreeBranch } from './types/tProductTreeBranch'

export default function BranchForm({
  branch,
  onChange,
  nameLabel,
  children,
}: PropsWithChildren<{
  branch: TProductTreeBranch
  onChange: (branch: TProductTreeBranch) => void
  nameLabel: string
}>) {
  return (
    <VSplit>
      <Input
        label={nameLabel}
        value={branch.name}
        onValueChange={(newValue) => onChange({ ...branch, name: newValue })}
        autoFocus
      />
      <Textarea
        label="Description"
        value={branch.description}
        onValueChange={(newValue) =>
          onChange({ ...branch, description: newValue })
        }
      />
      {children}
    </VSplit>
  )
}
