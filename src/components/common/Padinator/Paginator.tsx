import React, {useState} from 'react';
import styles from "./Padinator.module.css";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize: number
}

const Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNUmber = portionNumber * props.portionSize


    return (<>
            {
                portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNUmber)
                .map((page, index) => {
                    return <span key={index} style={{marginRight: '7px', borderBottom: '1px solid', cursor: 'pointer'}}
                                 className={props.currentPage === page ? styles.selectedPage : ''}
                                 onClick={() => {
                                     props.onPageChanged(page)
                                 }}>{page}</span>
                })}

            {
                portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
            }
        </>
    );
};

export {Paginator};