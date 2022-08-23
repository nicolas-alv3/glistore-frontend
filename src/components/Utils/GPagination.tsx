import {Pagination} from "semantic-ui-react";
import styles from '../../../styles/Utils.module.css';

interface Props {
    totalPages: number;
    onPageChange: (page: number) => void
}

export default function GPagination(props: Props) {
    return <>
        <div className={styles.paginatorContainer}>
            <Pagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                totalPages={props.totalPages}
                onPageChange={(e,data) => props.onPageChange(data.activePage as number)}
            />
        </div>
    </>
}