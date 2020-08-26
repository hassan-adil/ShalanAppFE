// import { connect } from "react-redux";
import React, { Component, useMemo, useEffect, useState } from "react";
import { DotsLoader, Navbar } from "../../components";
import { ErrorHelper } from "../../helpers";
import { getResource } from "../../config/simpleApiCalls";
import { REPORT_ALL_EMPLOYEES_API } from "../../config/WebServices";

import styled from 'styled-components';
import { useTable } from 'react-table';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const CustomTable = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const EmployeeReport = () => {
    const [employeeReports, setEmployeeReports] = useState([]);
    useEffect(() => {
        const main = async () => {
            const user = await JSON.parse(sessionStorage.getItem('user'));
            getResource(REPORT_ALL_EMPLOYEES_API, user?.token).then(res => {
                setEmployeeReports(res.data)
            }).catch(err => {
                console.log(err, 'err')
            })
        };
        main();
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'Fahad',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                    {
                        Header: 'Country',
                        accessor: 'country',
                    },
                    {
                        Header: 'Position',
                        accessor: 'position',
                    },
                    {
                        Header: 'Title',
                        accessor: 'title',
                    },
                ],
            },
        ],
        []
    )

    return (
        <div className="container-fluid bg-light">
            {/* <Navbar {...this.props} /> */}
            <div className="container min-vh-100">
            <div className="row">
            <div className="col-12 px-3 pt-3">
            
            <Styles>
                <CustomTable columns={columns} data={employeeReports} />
            </Styles >
            </div>
            </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({});

// const action = {};

// export default connect(mapStateToProps, action)(EmployeeReport);

export default EmployeeReport;
