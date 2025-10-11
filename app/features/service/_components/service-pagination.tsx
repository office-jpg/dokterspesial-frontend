import { useSearchParams } from "react-router";

import Pagination from "~/components/organisms/pagination";

interface ServicePaginationProps {
    page: number;
    totalPages: number;
    from: number;
    to: number;
    total: number;
}

export function ServicePagination({
    page,
    totalPages,
    from,
    to,
    total,
}: ServicePaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(newPage));
        setSearchParams(newParams, { preventScrollReset: true });
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination
            currentPage={page}
            setCurrentPage={handlePageChange}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            previousLabel="Sebelumnya"
            nextLabel="Selanjutnya"
            firstPageLabel="Halaman Pertama"
            lastPageLabel="Halaman Terakhir"
        />
    );
}
