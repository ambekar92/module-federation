'use client'
import { Button, Modal, ModalRef, ModalToggleButton, Search, Table } from '@trussworks/react-uswds'
import { useEffect, useRef, useState } from 'react';
import { hintMap, titleMap } from './map';
import styles from './SearchModal.module.scss';
import { Props, SearchItem } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

/**
 * @description a generic search modal component, that displays a table of data and allows user to search through the data by entering a search term. Word that includes the search term will be bolded in the table.
 * Each row is clickable. Clicking the row will add row's data to the selected items area below.
 * @param data - data to be displayed in the table. Data should be a dictionary where keys are column headers, and values for each key is an array of strings. Key should hold an array of the same size as other keys.
 * @example for data. Good:  { NAICS: ['111140', '112120'],
    'Industry Title': ['Wheat Farming', 'Dairy Cattle and Milk Production']}
    Bad: { NAICS: ['111140', '112120'], 'Industry Title': ['Wheat Farming', 'Dairy Cattle and Milk Production', 'Extra item - valu arrays should be same length for all keys']}
 * @param selectedItems: this is an array of indices of selected items. This is used to pre-select items when the modal is opened. 
 * @example for selectedItems: [0, 1] - will pre-select the first two rows in the table. 
 * @param cb - a callback function that will be called when the modal is closed. It will return an array of indices of selected items.
 * 
 * see consumer component that uses this dialog in sandbox/SearchModalExample.tsx. To see it in UI - naviagte to url to see the UI /sandbox 
 */
const SearchModal = ({ searchEntity, searchButtonText = 'Search', data, width='60rem', selectedItems = [], cb }: Props) => {
    const modalRef = useRef<ModalRef>(null);
    const [dataSource, setDataSource] = useState(data);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set(selectedItems));
    const [searchTerm, setSearchTerm] = useState('');

    const columns = Object.keys(data);

    useEffect(() => {
        if (!data) return;
        const rowValues = Object.values(data);
        const expectedLength = rowValues[0].length;
        if (rowValues.some(v => v.length !== expectedLength)) {
            throw new Error('rows should have the same number of columns');
        }
    }, [data])

    function handleSearch(term: string) {
        setSearchTerm(term);
        const filteredData: SearchItem = {};
        const rowIdx: number[] = []
        for (const [_, values] of Object.entries(data)) {
            values.forEach((val, idx) => {
                if (val.toLowerCase().includes(term.toLowerCase())) {
                    rowIdx.push(idx);
            }});
        }
        for (const [key, values] of Object.entries(data)) {
            filteredData[key] = values.filter((_, idx) => rowIdx.includes(idx));
        }
        setDataSource(filteredData);
    }

    function handleRowSelection(rowIndex: number) {
        const selected = new Set(selectedRows);
        if (selectedRows.has(rowIndex)) {
            selected.delete(rowIndex);
        } else {
            selected.add(rowIndex);
        }
        setSelectedRows(selected);
    }

    return (
        <>
            <ModalToggleButton outline modalRef={modalRef} opener>
                {searchButtonText}
            </ModalToggleButton>
            <Modal className='hide-cancel-btn' ref={modalRef} id={'search-modal'} aria-describedby="search-modal" style={{ minWidth: width, maxWidth: width}}>
                <h1>{titleMap[searchEntity]}</h1>
                <p>{hintMap[searchEntity]}</p>
                <div className={styles.searchInput}>
                    <Search onSubmit={(e) => e.preventDefault()} onKeyUp={(e) => handleSearch((e.target as HTMLInputElement).value)} style={{border: 'none'}} />
                </div>
                <hr className={styles.hr} />
                <div style={{maxHeight: '30rem', overflow: 'auto'}}>
                    <Table fullWidth={true}>
                        <thead>
                            <tr>
                                {columns.map(colHeader => (
                                    <th key={colHeader}>{colHeader}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                            Array.from({ length: Object.values(dataSource)[0].length }).map((_, rowIndex) => (
                                <tr key={rowIndex}  
                                onClick={() => handleRowSelection(rowIndex)} 
                                className={`${styles.row} ${selectedRows.has(rowIndex) ? styles.selectedRow : ''}`}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {dataSource[col][rowIndex]?.split(' ').map((word, idx) => (word.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim().length > 0 ? <strong>{word}&nbsp;</strong> : <span>{word}&nbsp;</span>))} 
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div style={{marginTop:'2rem'}}>
                    <h4>Selected Items:</h4>
                    {selectedRows.size > 0 && 
                        Array.from(selectedRows).map(idx => (
                            <div className={styles.selected}>
                                <div>{Object.values(data).map(array => array[idx]).join(' ')}</div>
                                <div style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faClose} onClick={() => handleRowSelection(idx)}/></div>
                            </div>
                        ))
                    }
                </div>

                <hr className={styles.hr} />
                <Button style={{float: 'right', margin: '2rem 0'}} type='button' onClick={() => {
                    cb(Array.from(selectedRows));
                    modalRef.current?.toggleModal()}}>Close</Button>
            </Modal>
        </>
    );
};

export default SearchModal;
