import React from "react";
import { Typography } from "../../ui";
import { classNames } from "../../libs/classNames/classNames";
import cls from "./Pagination.module.scss";
import { useMediaQuery } from "../../hooks";
import { Conditions } from "../../libs/conditions/conditions";

interface PaginationProps {
  totalCount: number;
  limit: number;
  page: number;
  setPage: (arg: number) => void;
} 

const Component = ({
  totalCount, limit, page, setPage, 
}: PaginationProps) => {
  const pages: number[] = [];
   
  const calculationСountPages = () => Math.ceil(totalCount / limit);

  const totalPage = calculationСountPages();
   
  const mobileWidthMediaQuery = useMediaQuery("(max-width: 770px)");
   
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  // countPage = количество страниц
  // slice = Тригер перелистывания
  // eslint-disable-next-line camelcase
  function calculate_pages(listPage: number[], currentPage: number, countPage: number = 8, slice: number = 3): number[] {
    mobileWidthMediaQuery
      ? countPage = 3
      : countPage = 7;
    mobileWidthMediaQuery
      ? slice = 1
      : slice = 3;
    if (currentPage >= listPage[listPage.length - 1]) {
      return listPage.slice(-countPage);
    }
    if (currentPage <= listPage[slice]) {
      return listPage.slice(0, countPage / 2).concat(listPage.slice(countPage / 2, countPage));
    }
    const result = listPage.slice(currentPage - countPage / 2, currentPage).concat(listPage.slice(currentPage, currentPage + countPage / 2));
    return result.length === countPage
      ? result
      : listPage.slice(-countPage);
  }
  const result = calculate_pages(pages, page);

  return (
    <Conditions condition={result.length}>
      <div className={cls.pages__wrapper}>
        {/* <div
               className={classNames(cls.page, { [cls.active]: page === 0 })}
               onClick={() => setPage((pages.slice(0)[0]))}
            >
               <Typography variant="h4">
                  {"<<"}
               </Typography>
            </div> */}
        {!mobileWidthMediaQuery
         && (
           <div
             className={classNames(cls.page, { [cls.active]: page === 0 })}
             onClick={() => setPage(page <= pages.slice(0)[0]
               ? 1
               : page - 1)}
           >
             <Typography variant="h4">
               {"<"}
             </Typography>
           </div>
         )}
        {
          result.map((pageItem) => (
            <div
              key={pageItem}
              className={classNames(cls.page, { [cls.active]: page === pageItem })}
              onClick={() => setPage(pageItem)}
            >
              <Typography variant="h4">
                {pageItem}
              </Typography>
            </div>
          ))
        }
        {!mobileWidthMediaQuery
         && (
           <div
             className={classNames(cls.page, { [cls.active]: page === page + 1 })}
             onClick={() => setPage(page >= pages.slice(-1)[0]
               ? pages.slice(-1)[0]
               : page + 1)}
           >
             <Typography variant="h4">
               {">"}
             </Typography>
           </div>
         )}
        {/* <div className={classNames(cls.page, { [cls.active]: page === 0 })} onClick={() => setPage((pages.slice(-1)[0]))}>
               <Typography variant="h4">
                  {">>"}
               </Typography>
            </div> */}
      </div>
    </Conditions>
  );
};

export const Pagination = React.memo(Component);
