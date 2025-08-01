import { usePathValidation } from '@/utils/validation/usePathValidation'
import React from 'react'
import { PropsWithChildren, useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { LanguageSwitcher } from '../forms/LanguageSwitcher'
import SecOSimpleVersion from '../forms/SecOSimpleVersion'
import { useTranslation } from 'react-i18next'
import StatusIndicator from '../StatusIndicator'

export default function NavigationLayout() {
  const { t } = useTranslation()

  return (
    <div className="flex grow">
      <div className="flex flex-col justify-between border-r p-4">
        <div className="flex basis-80 flex-col gap-2">
          <Section
            number={1}
            title={t('nav.documentInfo')}
            to="/document-information"
          >
            <SubSection
              title={t('nav.documentInformation.general')}
              to="/document-information/general"
            />
            <SubSection
              title={t('nav.documentInformation.notes')}
              to="/document-information/notes"
            />
            <SubSection
              title={t('nav.documentInformation.publisher')}
              to="/document-information/publisher"
            />
            <SubSection
              title={t('nav.documentInformation.references')}
              to="/document-information/references"
            />
            <SubSection
              title={t('nav.documentInformation.acknowledgments')}
              to="/document-information/acknowledgments"
            />
          </Section>
          <Section
            number={2}
            title={t('nav.products')}
            to="/product-management"
          />
          <Section
            number={3}
            title={t('nav.vulnerabilities')}
            to="/vulnerabilities"
          />
          <Section number={4} title={t('nav.tracking')} to="/tracking" />
        </div>

        <div className="flex flex-col gap-2">
          <SecOSimpleVersion />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="grow bg-editor">
        <Outlet />
      </div>
    </div>
  )
}

function Section({
  number,
  title,
  to,
  children,
}: PropsWithChildren<{
  number: number
  title: string
  to: string
}>) {
  const location = useLocation()
  const isActive = useMemo(
    () => location.pathname.startsWith(to),
    [location.pathname, to],
  )

  const pathValidation = usePathValidation(to)

  return (
    <div className="flex flex-col gap-2 text-neutral-foreground">
      <NavLink
        to={to}
        className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-content2 ${
          isActive ? 'bg-content2 font-semibold text-foreground' : ''
        }`}
      >
        <div
          className={`flex size-8 items-center justify-center rounded-full bg-content3 p-4 ${
            isActive ? 'bg-primary text-primary-foreground' : ''
          }`}
        >
          {number}
        </div>
        {React.Children.count(children) === 0 && (
          <StatusIndicator {...pathValidation} />
        )}
        {title}
      </NavLink>
      {children}
    </div>
  )
}

function SubSection({ title, to }: { title: string; to: string }) {
  const pathValidation = usePathValidation(to)

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex cursor-pointer items-center gap-2 pl-12 transition-colors hover:text-primary ${
          isActive ? 'text-primary' : ''
        }`
      }
    >
      <StatusIndicator {...pathValidation} />
      {title}
    </NavLink>
  )
}
