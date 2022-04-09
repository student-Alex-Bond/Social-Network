import React from 'react';
import styles from "./Padinator.module.css";

type PaginatorPropsType = {
    totalUsersCount : number
    pageSize : number
    currentPage: number
    onPageChanged: (page: number)=>void
}

const Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (<>
        {pages.map((page, index) => {
                return <span key={index} style={{marginRight: '7px', borderBottom: '1px solid', cursor: 'pointer'}}
                             className={props.currentPage === page ? styles.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(page)
                             }}>{page}</span>
            })}
        </>
    );
};

export {Paginator};