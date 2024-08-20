import {
    Button,
    Container,
    Dropdown,
    Form,
    FormField,
    Header,
    Input,
    Message,
    MessageHeader,
    Segment
} from "semantic-ui-react";
import React, {useState} from "react";
import {TxnSearchFilters} from "./TxnSearchFilters";
export interface TxnSearchProps {
    startDate: string
    endDate: string
    handleSubmit: (filters: TxnSearchFilters) => void;
}
const TxnSearchForm = (props: TxnSearchProps) => {
    const [year, setYear] = useState<number>(2021)
    const [record, setRecord] = useState<TxnSearchFilters>({
        startDate: props.startDate,
        endDate: props.endDate
    })
    const years = [
        {key: '2021', text: 'Apr 2020 to Mar 2021', description: `Financial Year Ending Mar 2021`, value: 2021, selected:false, active: true},
        {key: '2022', text: 'Apr 2021 to Mar 2022', description: `Financial Year Ending Mar 2022`, value: 2022, selected:false, active: true},
        {key: '2023', text: 'Apr 2022 to Mar 2023', description: `Financial Year Ending Mar 2023`, value: 2023, selected:false, active: true}
    ];
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(record){
            props.handleSubmit(record)
        }
    }
    const onYearChange = (value: number) => {
        setYear(value)
        const startDate = `${value-1}-04-01`
        const endDate = `${value}-03-31`
        setRecord({
            startDate,
            endDate
        })
    }
    return <Segment basic>
        <Header as='h3'>Financial Year</Header>
        <Container>
            <Form>
                <FormField>
                    <label>Financial Year</label>
                    <Dropdown
                        placeholder='Select'
                        icon="cog"
                        className='icon'
                        labeled button
                        selection
                        options={years}
                        value={year}
                        onChange={(e, data) => onYearChange(data.value as number)}
                    />
                </FormField>
                {/*<FormField>*/}
                {/*    <label>Start Date</label>*/}
                {/*    <input type="date" placeholder='Start date for the contract' value={record.startDate} onChange={(e) => setRecord({...record, startDate: e.target.value})}/>*/}
                {/*</FormField>*/}
                {/*<FormField>*/}
                {/*    <label>End Date</label>*/}
                {/*    <input type="date" placeholder='End date for the contract' value={record.endDate} onChange={(e) => setRecord({...record, endDate: e.target.value})}/>*/}
                {/*</FormField>*/}
                <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
                {/*<Button onClick={handleCancel}>Cancel</Button>*/}
            </Form>
        </Container>
    </Segment>
}
export default TxnSearchForm;