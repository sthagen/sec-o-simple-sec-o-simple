import ComponentList from '@/components/forms/ComponentList'
import HSplit from '@/components/forms/HSplit'
import { Input, Textarea } from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import VSplit from '@/components/forms/VSplit'
import StatusIndicator from '@/components/StatusIndicator'
import { checkReadOnly, getPlaceholder } from '@/utils/template'
import { ListState } from '@/utils/useListState'
import { usePrefixValidation } from '@/utils/validation/usePrefixValidation'
import { Chip } from '@heroui/chip'
import { SelectItem } from '@heroui/select'
import { useTranslation } from 'react-i18next'
import { uid } from 'uid'

export const noteCategories = [
  'description',
  'details',
  'faq',
  'general',
  'legal_disclaimer',
  'other',
  'summary',
] as const

export type TNoteCategory = (typeof noteCategories)[number]

export type TNote = {
  id: string
  category: TNoteCategory
  content: string
  title: string
}

export const NoteGenerator = (): TNote => ({
  id: uid(),
  title: '',
  category: 'description',
  content: '',
})

export function NotesList({
  notesListState,
  csafPath,
  isTouched = false,
}: {
  notesListState: ListState<TNote>
  csafPath: string
  isTouched?: boolean
}) {
  const { t } = useTranslation()

  return (
    <ComponentList
      listState={notesListState}
      title="title"
      itemLabel={t('notes.note')}
      itemBgColor="bg-zinc-50"
      content={(note, index) => (
        <NoteForm
          note={note}
          csafPath={`${csafPath}/${index}`}
          isTouched={isTouched}
          onChange={notesListState.updateDataEntry}
        />
      )}
      startContent={({ item, index }) => (
        <NoteStartContent item={item} csafPath={`${csafPath}/${index}`} />
      )}
    />
  )
}

function NoteStartContent({
  item,
  csafPath,
}: {
  item: TNote
  csafPath: string
}) {
  const { hasErrors } = usePrefixValidation(csafPath)
  const { t } = useTranslation()

  return (
    <>
      <StatusIndicator hasErrors={hasErrors} hasVisited={true} />
      <Chip color="primary" variant="flat" radius="md" size="lg">
        {t(`notes.categories.${item.category}`)}
      </Chip>
    </>
  )
}

function NoteForm({
  note,
  csafPath,
  onChange,
  isTouched = false,
}: {
  note: TNote
  csafPath: string
  onChange: (note: TNote) => void
  isTouched?: boolean
}) {
  const { t } = useTranslation()

  return (
    <VSplit className="pt-4">
      <HSplit className="items-start">
        <Select
          label={t('notes.category')}
          csafPath={`${csafPath}/category`}
          isTouched={isTouched}
          isRequired
          selectedKeys={[note.category]}
          onSelectionChange={(selected) => {
            if (!selected.anchorKey) return

            onChange({
              ...note,
              category: [...selected][0] as TNoteCategory,
            })
          }}
          isDisabled={checkReadOnly(note, 'category')}
          placeholder={getPlaceholder(note, 'category')}
        >
          {noteCategories.map((key) => (
            <SelectItem key={key}>{t(`notes.categories.${key}`)}</SelectItem>
          ))}
        </Select>
        <Input
          label={t('notes.title')}
          isTouched={isTouched}
          csafPath={`${csafPath}/title`}
          value={note.title}
          onValueChange={(newValue) => onChange({ ...note, title: newValue })}
          autoFocus={true}
          placeholder={getPlaceholder(note, 'title')}
          isDisabled={checkReadOnly(note, 'title')}
          isRequired
        />
      </HSplit>
      <Textarea
        label={t('notes.content')}
        isTouched={isTouched}
        csafPath={`${csafPath}/text`}
        value={note.content}
        onValueChange={(newValue) => onChange({ ...note, content: newValue })}
        placeholder={getPlaceholder(note, 'content')}
        isDisabled={checkReadOnly(note, 'content')}
        isRequired
      />
    </VSplit>
  )
}
