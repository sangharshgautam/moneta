import Transactions from "../transaction/Transactions";
import React, {useEffect, useState} from "react";
import {Account, Agency, Transaction} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

const SearchTransaction = (props: {account: Account}) => {
    const [progress, setProgress] = useState(0)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    useEffect(() => {
        MonetaApi.search<Transaction[]>(`account/${props.account.id}/transaction`, {}, setProgress).then(
            result => setTransactions(result.data)
        )
    }, [props.account.id])
    return <>
        <Transactions records={transactions} />
    </>
}
export default SearchTransaction;