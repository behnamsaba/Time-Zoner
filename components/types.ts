export interface TimeZoneOption
{
    fullName: string;
    label: string;
    jsName: string;
    iana: string;
}

export interface SelectedTimeZone
{
    fullName: string;
    label: string;
    jsName: string;
    iana: string;
}


export interface TimeZoneFormProps
{
    onSubmit: ( timeZone: SelectedTimeZone ) => void;
    onCancel: () => void;
}

export interface TimeZonesListProps { }

export interface DateDifference {
    years: number;
    months: number;
    weeks: number;
    days: number;
}

export interface DateCalculationsFormProps { }

export interface CalculatedTimeDifferenceProps {
    diff: DateDifference;
}