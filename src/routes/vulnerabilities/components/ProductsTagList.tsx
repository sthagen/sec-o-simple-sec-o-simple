import ProductSelect from '@/components/forms/ProductSelect'
import VSplit from '@/components/forms/VSplit'
import TagList from '@/routes/products/components/TagList'
import { useEffect, useState } from 'react'
import {
  TProductTreeBranchWithParents,
  getFullPTBName,
} from '@/routes/products/types/tProductTreeBranch'
import { useProductTreeBranch } from '@/utils/useProductTreeBranch'

export type ProductsTagListProps = {
  products?: string[]
  onChange?: (productIds: string[]) => void
}

export default function ProductsTagList({
  products,
  onChange,
}: ProductsTagListProps) {
  const { findProductTreeBranchWithParents } = useProductTreeBranch()

  const initialProducts =
    (products
      ?.map((x) => findProductTreeBranchWithParents(x))
      .filter((x) => x !== undefined) as TProductTreeBranchWithParents[]) ?? []

  const [selectedProducts, setSelectedProducts] = useState(initialProducts)

  useEffect(() => {
    onChange?.(selectedProducts.map((x) => x.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedProducts)])

  return (
    <VSplit className="gap-2">
      <span className="text-sm">Products</span>
      <ProductSelect
        onAdd={(ptb) =>
          setSelectedProducts([
            ...new Set([
              ...selectedProducts,
              findProductTreeBranchWithParents(
                ptb.id,
              ) as TProductTreeBranchWithParents,
            ]),
          ])
        }
      />
      {selectedProducts.length > 0 && (
        <TagList
          items={selectedProducts}
          labelGenerator={(x) => getFullPTBName(x)}
          onRemove={(ptb) =>
            setSelectedProducts(selectedProducts.filter((x) => x.id !== ptb.id))
          }
        />
      )}
      {selectedProducts.length === 0 && (
        <span className="text-center text-neutral-foreground">
          No products added yet
        </span>
      )}
    </VSplit>
  )
}
