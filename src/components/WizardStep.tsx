import { Button } from '@heroui/button'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import ProgressBar from './ProgressBar'

export type WizardStepProps = PropsWithChildren<{
  title?: string
  progress?: number
  onBack?: string | (() => void)
  onContinue?: string | (() => void)
  noContentWrapper?: boolean
}>

export default function WizardStep({
  title,
  progress,
  onBack,
  onContinue,
  children,
  noContentWrapper,
}: WizardStepProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex max-w-5xl flex-col gap-4 p-8">
      <ProgressBar
        sections={[
          t('nav.document'),
          t('nav.products'),
          t('nav.vulnerabilities'),
          t('nav.tracking'),
        ]}
        progress={progress ?? 1}
      />
      {(noContentWrapper && <>{children}</>) || (
        <div className="flex flex-col gap-2 rounded-lg border-1 border-default-200 bg-content1 p-8">
          {title && <div className="mb-4 text-xl font-semibold">{title}</div>}
          {children}
        </div>
      )}
      <div className="flex justify-between">
        <div>
          {onBack !== undefined && (
            <Button
              onPress={() =>
                typeof onBack === 'string' ? navigate(onBack) : onBack?.()
              }
              variant="bordered"
              className="border-1 bg-content1"
            >
              {t('common.back')}
            </Button>
          )}
        </div>
        {onContinue !== undefined && (
          <Button
            onPress={() =>
              typeof onContinue === 'string'
                ? navigate(onContinue)
                : onContinue?.()
            }
            color="primary"
          >
            {t('common.next')}
          </Button>
        )}
      </div>
    </div>
  )
}
