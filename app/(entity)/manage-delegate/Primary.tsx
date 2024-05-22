import { Table } from "@trussworks/react-uswds"
import React, { CSSProperties } from 'react'

const Primary = () => {
    const leftColStyles: CSSProperties = { background: '#dfe1e2', fontWeight: 800, width: '30%' }

    return (
        <>
        <h2>Primary</h2>
        <Table bordered fullWidth>
            <tbody>
                <tr>
                    <td data-testid="business-name" style={leftColStyles}>Business Name</td>
                    <td>XYZ Company</td>
                </tr>
                <tr>
                    <td data-testid="dba" style={leftColStyles}>DBA</td>
                    <td>DBA Name</td>
                </tr>
                <tr>
                    <td data-testid="uei" style={leftColStyles}>UEI</td>
                    <td>92029239</td>
                </tr>
                <tr>
                    <td data-testid="address" style={leftColStyles}>Address</td>
                    <td>123 Main st.</td>
                </tr>
                <tr>
                    <td data-testid="entity-type" style={leftColStyles}>Entity Type</td>
                    <td>ABC Type</td>
                </tr>
                <tr>
                    <td data-testid="entity-owned" style={leftColStyles}>Entity-Owned</td>
                    <td>John Smith</td>
                </tr>
                <tr>
                    <td data-testid="government-contact" style={leftColStyles}>Government Contact</td>
                    <td>Joe Doe</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}

export default Primary