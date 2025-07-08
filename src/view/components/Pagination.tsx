import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { useSearchParams } from "react-router";

import { Button } from "./ui/button";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem
} from "./ui/pagination";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSearchParam = searchParams.get("page");

  const currentPage = pageSearchParam ? Number(pageSearchParam) : 1;

  function handleChangePage(page: number) {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", page.toString());

      return prevSearchParams;
    });
  }

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            aria-label="Ir para primeira página"
            disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => handleChangePage(1)}
            variant="ghost"
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronFirstIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            aria-label="Ir para página anterior"
            disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => handleChangePage(currentPage - 1)}
            variant="ghost"
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            aria-label="Ir para próxima página"
            disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => handleChangePage(currentPage + 1)}
            variant="ghost"
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            aria-label="Ir para última página"
            disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => handleChangePage(totalPages)}
            variant="ghost"
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronLastIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
