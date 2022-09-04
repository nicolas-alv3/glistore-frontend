import {Table} from "semantic-ui-react";
import React, {ReactNode} from "react";

interface Props {
    elements: any[],
    headers: string[],
    columns: Array<(element: any) => string | number | ReactNode>
}

export default function GTable(props: Props) {
    return <>
        <Table>
            <Table.Header>
                <Table.Row>
                    {
                        props.headers.map( h => {
                            return <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                        })
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.elements.map((e) => {
                    return <Table.Row key={e}>
                        {props.columns.map( (col,i) => <Table.Cell key={i}>{col(e)}</Table.Cell>)}
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    </>
}