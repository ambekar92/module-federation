'use client'
import { Pagination } from '@trussworks/react-uswds';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TablePagination = ({ totalPages }: { totalPages: number }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchParamsState = new URLSearchParams(Array.from(searchParams.entries()));

  const router = useRouter();

  function updatePageSearchParam(e: any, page?: number) {
    const p = page !== undefined ? page : parseInt(searchParamsState.get('page') || '1');
    searchParamsState.set('page', p.toString());
    const q = searchParamsState.toString()
    router.push(`${pathName}?${q}`)
  }

  function handleOnPrevious() {
    const p = parseInt(searchParamsState.get('page') || '1');
    if (p > 1) {
      searchParamsState.set('page', (p - 1).toString());
      const q = searchParamsState.toString()
      router.push(`${pathName}?${q}`)
    }
  }

  function handleOnNext() {
    const p = parseInt(searchParamsState.get('page') || '1');
    if (p < totalPages) {
      searchParamsState.set('page', (p + 1).toString());
      const q = searchParamsState.toString()
      router.push(`${pathName}?${q}`)
    }
  }

  return (
    <Pagination
      maxSlots={5}
      onClickPrevious={handleOnPrevious}
      onClickNext={handleOnNext}
      onClickPageNumber={(e, p) => updatePageSearchParam(e, p)}
      currentPage={parseInt(searchParamsState.get('page') ?? '1') ?? 1}
      pathname={'#'} totalPages={totalPages} />
  )
}

export default TablePagination