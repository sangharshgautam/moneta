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
}
export interface Contract extends  NewContract {
    id:number|string
    agency: Agency
}
export interface NewTimesheet {
    id?:number|string
    contract?: Identifier
    refId: string
    startDate: string
    endDate: string
    days: number
    status: string
}
export interface Timesheet extends NewTimesheet{
    id:number|string
    contract: Contract
}
