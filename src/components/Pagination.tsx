'use client';
import { ITEMS_PER_PAGE } from '@/lib/settings';
import { useRouter } from 'next/navigation';

const Pagination = ({ page, count }: { page: number; count: number }) => {
    const router = useRouter();
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    const getPaginationRange = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let pages = new Set<number>();
        pages.add(1);
        pages.add(totalPages);
        pages.add(page);
        if (page > 2) pages.add(page - 1);
        if (page > 3) pages.add(page - 2);
        if (page < totalPages - 1) pages.add(page + 1);
        if (page < totalPages - 2) pages.add(page + 2);

        return Array.from(pages).sort((a, b) => a - b);
    };

    const paginationRange = getPaginationRange();

    return (
        <div className='p-4 flex items-center justify-between text-gray-500'>
            <button
                disabled={page === 1}
                className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => changePage(page - 1)}
            >
                Prev
            </button>
            <div className='flex items-center gap-2 text-sm'>
                {paginationRange.map((p, i, arr) => (
                    <>
                        {i > 0 && p - arr[i - 1] > 1 && <span key={`dots-${i}`}>...</span>}
                        <button
                            key={p}
                            className={`px-2 rounded-sm ${p === page ? 'bg-smdSkyBlue' : ''}`}
                            onClick={() => changePage(p)}
                        >
                            {p}
                        </button>
                    </>
                ))}
            </div>
            <button
                disabled={page === totalPages}
                className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => changePage(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
