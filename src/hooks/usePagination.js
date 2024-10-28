import { useMemo } from "react";

export const usePagination = (totalPages) => {
  const pagesArray =  useMemo(() => {
  const array = []; 
  for (let i = 1; i <= totalPages; i++) {
    array.push(i);
  }
  return array;
}, [totalPages])

  return pagesArray
}