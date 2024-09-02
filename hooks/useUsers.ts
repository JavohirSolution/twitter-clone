"use client";

import fetcher from '@/lib/fetcher';
import swr from 'swr';

const useUsers = (limit: number) => {
    const { data, error, isLoading, mutate } = swr(
        `/api/users?limit=${limit}`,
        fetcher
    );

    return { data, error, isLoading, mutate };
};

export default useUsers