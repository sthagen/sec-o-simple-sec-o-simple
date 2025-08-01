import HSplit from '@/components/forms/HSplit'
import IconButton from '@/components/forms/IconButton'
import VSplit from '@/components/forms/VSplit'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@heroui/theme'
import { HTMLProps, PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router'

export type InfoCardProps = HTMLProps<HTMLDivElement> &
  PropsWithChildren<{
    variant?: 'boxed' | 'plain'
    title: string
    description?: string
    startContent?: ReactNode
    endContent?: ReactNode
    linkTo?: string
    onEdit?: () => void
    onDelete?: () => void
  }>

export default function InfoCard(props: InfoCardProps) {
  if (props.variant === 'boxed') {
    return <BoxedInfoCard {...props} />
  } else {
    const {
      title,
      description,
      startContent,
      endContent,
      linkTo,
      onEdit,
      onDelete,
      children,
      ...divProps
    } = props
    return (
      <VSplit {...divProps}>
        <HSplit className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {startContent}
            <div
              className={cn('font-bold', {
                'hover:underline': linkTo,
              })}
            >
              {linkTo ? <Link to={linkTo}>{title}</Link> : title}
            </div>

            <div className="text-neutral-foreground">{description}</div>
          </div>
          <div>
            {endContent}
            {onEdit && <IconButton icon={faEdit} onPress={onEdit} />}
            {onDelete && <IconButton icon={faTrash} onPress={onDelete} />}
          </div>
        </HSplit>
        {children}
      </VSplit>
    )
  }
}

function BoxedInfoCard(props: InfoCardProps) {
  return (
    <div className="rounded-lg border bg-content1 px-4 py-2">
      <InfoCard {...props} variant="plain" />
    </div>
  )
}
