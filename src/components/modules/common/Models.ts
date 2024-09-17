export interface Identifier {
    id:number|string
}
export interface NewAgency {
    id?:number|string
    name: string
    contact: string
    website: string
}
export interface Agency extends NewAgency {
    id:number
}
export interface NewContract {
    id?:number|string
    agency?: Identifier
    refId: string
    startDate: string
    endDate: string
    type: 'INSIDE' | 'OUTSIDE'
}
export interface Contract extends  NewContract {
    id:number|string
    agency: Agency
}
export interface NewService {
    id?:number|string
    name: string
}
export interface Service extends NewService{
    id:number|string
}
export interface NewTimesheet {
    id?:number|string
    contractService?: Identifier
    refId: string
    startDate: string
    endDate: string
    days: number
    status: string
}
export interface SalarySlip {
    totalEarning: number
    netPayment: number
}
export interface Timesheet extends NewTimesheet{
    id:number|string
    contractService: ContractService
    salarySlip: SalarySlip
}
export interface NewContractService {
    id?:number|string|undefined
    contract: Contract
    service: Service | undefined
    rate: number
}
export interface ContractService extends NewContractService {
    id:number|string
    contract: Contract
    service: Service
}
export interface NewInvoiceItem {
    id?:number
    contractService?: Identifier
    days: number
}
export interface InvoiceItem {
    id:number
    contractService: ContractService
    days: number
    amount: number
}

export interface NewInvoice {
    id?:number|string|undefined
    refId?:number|string|undefined
    startDate?: string
    endDate?: string
    status?: string
    invoiceItems: NewInvoiceItem[]
}
export interface Invoice {
    id:number|string
    refId: string
    date: string
    startDate: string
    endDate: string
    status: string
    invoiceItems: InvoiceItem[]
    amount: number
    tax: number
    total: number
    due: number
}
export interface Payment {
    id: number | string
    date: string
    amount: number;
}
export interface Expense {
    id: number | string
    description: string
    date: string
    amount: number
    paid: boolean
}
export interface Transaction {
    id: number | string
    date: string
    description: string
    category: string
    type: string
    amount: string
    balance: string
    approved: boolean
}
export interface Account {
    id: number | string
    name: string
    balance: number
    transactions: Transaction[]
}
export interface Report {
    vatReports: VATReport[]
    taxReports: CorpTaxReport[]
    transactions: Transaction[]
    openingBalance: number
    closingBalance: number
}
export interface VATReport {
    yearMonth: string
    quarter: number
    year: number
    revenue: number
    calculatedVAT: number
    paidVAT: number
    vatDue: number
}
export interface ExpenseDTO {
    description: string
    amount: number
    actualTax: number
    calculatedTax: number
    paidVAT: number
    wages: number
    travel: number
    motor: number
    staffCost: number
    expense: number
    paidTax: number
    taxDue: number
    profit: number
    calculated: number
}
export interface TaxReport {
    revenue: number
    vat: number
    tax: number
    paidTax: number
    taxDue: number
    balance: number
    profitBeforeTax: number
    profitAfterTax: number
    turnover: number
    staffCost: number
    depreciation: ExpenseDTO[]
    staffCosts: ExpenseDTO[]
    other: ExpenseDTO[]
}
export interface CorpTaxReport {
    year: number
    projected: TaxReport
    actual: TaxReport
    taxOpeningBalance: number
    taxClosingBalance: number

}
