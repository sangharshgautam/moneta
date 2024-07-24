import {Button, Dropdown, FormField, Input, Label, TableCell, TableRow} from "semantic-ui-react";
import React, {useState} from "react";
import {ContractService, NewInvoiceItem} from "../../components/modules/common/Models";

const InvoiceItem = (props: {index: number, item: NewInvoiceItem, services: ContractService[]}) => {
    const [item, setItem] = useState<NewInvoiceItem>({days: 0})
    const [contractService, setContractService] =  useState<ContractService | undefined>()
    const services = props.services.map(service => {
        return {key: service.id, text: service.service.name, description: `@ ${service.rate}`, value: service.id, selected:true, active: true}
    });
    const onServiceChange = (data: any) => {
        setItem({...item, contractService: {id: data.value as number}})
        const cs = props.services.find((service) => service.id ===  data.value);
        setContractService(cs)
    }
    const handleDelete = () => {

    }
    return (<TableRow key={props.index}>
        <TableCell>
            <FormField>
                <Dropdown
                    placeholder='Select'
                    icon="cog"
                    className='icon'
                    labeled button
                    selection
                    options={services}
                    value={contractService?.id}
                    onChange={(e, data) => onServiceChange(data)}
                />
            </FormField>
        </TableCell>
        <TableCell negative>
            £ {contractService?.rate}
        </TableCell>
        <TableCell>
            <Input type="text" placeholder='no of days' value={item.days}
                   onChange={(e) => setItem({...item, days: e.target.value as unknown as number})}
            />
        </TableCell>
        <TableCell>
            {/*
            // @ts-ignore */}
            <Input labelPosition='right' type='text' placeholder='Amount' value={contractService?.rate * item.days} disabled={true}>
                <Label basic>£</Label>
                <input />
            </Input>
        </TableCell>
        <TableCell key="action">
            <Button size='small' positive icon="edit"></Button>
            <Button size='small' negative icon="trash" onClick={() => handleDelete()}></Button>
        </TableCell>
    </TableRow>)
}
export default InvoiceItem;