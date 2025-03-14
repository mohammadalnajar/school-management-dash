'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TableSearch = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const changeSearch = () => {
        const params = new URLSearchParams(window.location.search);

        params.set('search', search);
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
            <Image src='/search.png' alt='' width={14} height={14} />
            <input
                type='text'
                placeholder='Search...'
                className='w-[200px] p-2 bg-transparent outline-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        changeSearch();
                    }
                }}
            />
        </div>
    );
};

export default TableSearch;
