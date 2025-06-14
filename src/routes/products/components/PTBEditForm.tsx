import {
  TProductTreeBranch,
  TProductTreeBranchProductType,
  productTreeBranchProductTypes,
} from '../types/tProductTreeBranch'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@/components/forms/Input'
import { useState } from 'react'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal'
import { checkReadOnly, getPlaceholder } from '@/utils/template'
import Select from '@/components/forms/Select'
import { SelectItem } from '@heroui/select'

export type PTBEditFormProps = {
  ptb?: TProductTreeBranch
  onSave?: (updatedPtb: TProductTreeBranch) => void
}

export function PTBEditForm({ ptb, onSave }: PTBEditFormProps) {
  const [name, setName] = useState(ptb?.name ?? '')
  const [description, setDescription] = useState(ptb?.description ?? '')
  const [type, setType] = useState(ptb?.type ?? 'Software')

  const categoryLabel =
    ptb?.category === 'vendor'
      ? 'Vendor'
      : ptb?.category === 'product_name'
        ? 'Product'
        : ptb?.category === 'product_version'
          ? 'Product Version'
          : ''

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Edit {categoryLabel}</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={name}
              onValueChange={setName}
              isDisabled={!ptb || checkReadOnly(ptb, 'name')}
              placeholder={ptb ? getPlaceholder(ptb, 'name') : undefined}
            />
            <Textarea
              label="Description"
              value={description}
              onValueChange={setDescription}
              isDisabled={!ptb || checkReadOnly(ptb, 'description')}
              placeholder={ptb ? getPlaceholder(ptb, 'description') : undefined}
            />
            {ptb?.category === 'product_name' && (
              <Select
                label="Type"
                selectedKeys={[type ?? 'Software']}
                onSelectionChange={(selected) => {
                  setType([...selected][0] as TProductTreeBranchProductType)
                }}
                isDisabled={!ptb || checkReadOnly(ptb, 'type')}
                placeholder={ptb ? getPlaceholder(ptb, 'type') : undefined}
              >
                {productTreeBranchProductTypes.map((type) => (
                  <SelectItem key={type}>{type}</SelectItem>
                ))}
              </Select>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cancel</Button>
            <Button
              color="primary"
              onPress={() => {
                if (ptb) {
                  onSave?.({ ...ptb, name, description, type })
                }
                onClose()
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  )
}
