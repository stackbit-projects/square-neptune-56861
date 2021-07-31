import React from 'react'
import { StyledCheckbox, StyledDropdown, StyledDropdownGroup, StyledError, StyledInput, StyledLabel, StyledLegend, StyledRadio, StyledTextArea } from '../Form.styles'

import range from 'ramda/src/range'

interface FieldProps {
  required?: boolean
  className?: string
  disabled?: boolean
  helptext?: string;
  type?: string
  value: any
  name: string
  error?: boolean
  label: string
  'aria-label'?:string
  'aria-describedby'?:string
  onChange: (e: any) => void
  onBlur: (e: any) => void
}

export const Label = (props: {gutter?: boolean, required?: boolean, name: string, label: string, disabled?:boolean }) => (
  <StyledLabel gutter={props.gutter} disabled={props.disabled} htmlFor={props.name}>{props.label}{props.required ? "*" : ""}</StyledLabel>
)

export const Legend = (props: {gutter?: boolean, required?: boolean, label: string, disabled?:boolean }) => (
  <StyledLegend gutter={props.gutter} disabled={props.disabled} >{props.label}{props.required ? "*" : ""}</StyledLegend>
)

export const Text = (props: {htmlElement: string}) => <div dangerouslySetInnerHTML={{ __html: props.htmlElement }} />

export const CheckBox = ({ label, ...props }) => {
  return (
    <StyledCheckbox htmlFor={props.id} disabled={props.disabled}>
      <input {...props}  type="checkbox" checked={props.selected} />
      <span>{label}{props.required? "*" : ""}</span>
    </StyledCheckbox>
  )
}

export const Radio = ({ label, ...props }) => {
  return (
    <StyledRadio htmlFor={props.id} disabled={props.disabled}>
      <input {...props} type="radio"  checked={props.selected} />
      <span>{label}{props.required? "*" : ""}</span>
    </StyledRadio>
  )
}

export const DatePickerDropdowns = ({ label, required, ...props }) => {

  let initValue: Date = props.initValue ? new Date(props.initValue) : null;

  const defaultMinDate = new Date();
  defaultMinDate.setFullYear(defaultMinDate.getFullYear() - 120)

  const defaultMaxDate = new Date();
  defaultMaxDate.setFullYear(defaultMaxDate.getFullYear() + 51)

  let minDate: Date = props.min ? new Date(props.min) : defaultMinDate;
  let maxDate: Date = props.max ? new Date(props.max) : new Date();

  const isFutureDatePicker = Boolean(props.alias.toLowerCase() === 'future')

  const now = new Date()
  const nowDay = now.getDate()
  const nowMonth = now.getMonth()
  const nowYear = now.getFullYear()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const populateDays = (monthIndex:any, nowDay:number, nowMonth:number, nowYear:number, disablePastDates:boolean = false) => {
    // Create variable to hold new number of days to inject
    let days;
    // 31 or 30 days?
    if(
      monthIndex === "" ||
      months[monthIndex-1] === 'January' ||
      months[monthIndex-1] === 'March' ||
      months[monthIndex-1] === 'May' ||
      months[monthIndex-1] === 'July' ||
      months[monthIndex-1] === 'August' ||
      months[monthIndex-1] === 'October' ||
      months[monthIndex-1] === 'December'
    ) {
      days = 31;
    } else if(
        months[monthIndex-1] === 'April' ||
        months[monthIndex-1] === 'June' ||
        months[monthIndex-1] === 'September' ||
        months[monthIndex-1] === 'November'
      ) {
      days = 30;
    } else {
    // If month is February, calculate whether it is a leap year or not
    const isLeap = new Date(Number(selectedYear), 1, 29).getMonth() === 1;
    isLeap ? days = 29 : days = 28;
    }
    
    const daysOptions = range(1, days + 1).map((d, i) => ({
      value:d,
      label:d,
      disabled: (disablePastDates && nowYear === selectedYear && (nowMonth === monthIndex-1) && i < nowDay-1)
    }));
    return daysOptions;
  }

  const populateMonths = (nowMonth:number, nowYear:number, disablePastDates:boolean) => {
    const monthOptions = months.map((m, i) => ({value:i+1, label:m, disabled: (disablePastDates && nowYear === selectedYear && i < nowMonth)}));
    return monthOptions
  }

  // Flip years range around for past date selection
  const yearRange = range(minDate.getFullYear(), maxDate.getFullYear()+1).map( y => ({value:y, label:y}))
  const yearOptions =  (props.alias.toLowerCase() === 'past') ?
  yearRange.reverse() : yearRange

  const day = initValue ? initValue.getDate() : "";
  const month = initValue ? initValue.getMonth() + 1 : "";
  const year = initValue ? initValue.getFullYear() : "";

  const [selectedDay, setSelectedDay] = React.useState<number|string>(day)
  const [selectedMonth, setSelectedMonth] = React.useState<number|string>(month)
  const [selectedYear, setSelectedYear] = React.useState<number|string>(year)
  const [dayOptions, setDayOptions] = React.useState(populateDays(month, nowDay, nowMonth, nowYear, isFutureDatePicker))
  const [monthOptions, setMonthOptions] = React.useState(populateMonths(nowMonth, nowYear, isFutureDatePicker))

  React.useEffect(() => {

    setMonthOptions(populateMonths(nowMonth, nowYear, isFutureDatePicker))
    const dayOptions = populateDays(selectedMonth, nowDay, nowMonth, nowYear, isFutureDatePicker)
    setDayOptions(dayOptions)
    // check is selectedDay is outside max day range of selectedMonth
    // if so, adjust down to nearest valid date
    const numOfDays = dayOptions.length;
    if(selectedDay && selectedDay > numOfDays) {
      setSelectedDay(numOfDays)
    }

    if (isFutureDatePicker && selectedYear === nowYear && selectedMonth === nowMonth+1 && selectedDay < nowDay) {
      setSelectedDay('')
    }

    if (isFutureDatePicker && selectedYear === nowYear && selectedMonth < nowMonth+1) {
      setSelectedMonth('')
    }
  }, [selectedMonth, selectedYear])

  React.useEffect(() => {
    if (selectedDay === '' || selectedMonth === '' || selectedYear === '') {
      props.onChange('')
      return
    }
    const monthIndex:number = Number(selectedMonth)
    const dateString = `${selectedYear}-${String(monthIndex).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    props.onChange(dateString)
  }, [selectedDay, selectedMonth, selectedYear])

  return (
    <React.Fragment>
        <div>
          <Label name={props.name} label={label} required={required} />
          <StyledDropdownGroup>
            <span>
              <DropDown
                options={dayOptions}
                addDefault={true}
                label='Day'
                type='select-group'
                error={props.error}
                aria-label={`${label} Day`}
                aria-describedby={props['aria-describedby']}
                value={selectedDay}
                required={required}
                onChange={e => {setSelectedDay( e.target.value !== "" ? parseInt( e.target.value , 10 ) : "")}}
                {...props.fieldProps}
              />
            </span>
            <span>
              <DropDown
                options={monthOptions}
                addDefault={true}
                label='Month'
                type='select-group'
                error={props.error}
                aria-label={`${label} Month`}
                value={selectedMonth}
                required={required}
                onChange={e => {setSelectedMonth( e.target.value !== "" ? parseInt( e.target.value, 10 ) : "")}}
                {...props.fieldProps}
              />
            </span>
            <span>
              <DropDown
                options={yearOptions}
                addDefault={true}
                label='Year'
                type='select-group'
                error={props.error}
                aria-label={`${label} Year`}
                value={selectedYear}
                required={required}
                onChange={e => {setSelectedYear( e.target.value !== "" ? parseInt( e.target.value, 10 ) : "")}}
                {...props.fieldProps}
              />
            </span>
          </StyledDropdownGroup>
        </div>
    </React.Fragment>
  )
}

interface DropDownProps extends FieldProps{
  rows?: number
  options: {value: string, label: string, disabled?: boolean}[]
  addDefault?: boolean
}

export const DropDown = ({ label, options, addDefault, type, rows, required, error, ...props }: DropDownProps) => {
  
  return !props.disabled && (
  <React.Fragment>
    <Label name={props.name} label={label} required={required} />
    <StyledDropdown 
      error={error}
      aria-label={props['aria-label']}
      removeGutter={Boolean(type === 'select-group' && !error)}
      className={props.className}
      id={props.name}
      name={props.name}
      {...props}
      size={rows}
    >
      {addDefault && <option value="" disabled={true} onChange={props.onChange}>Please select...</option>}
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          onChange={props.onChange}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  </React.Fragment>
)}

export const Input = ({ required, helptext, type, error, label, ...props }: FieldProps) => {
  return !props.disabled && (
    <React.Fragment>
      <Label disabled={props.disabled} name={props.name} label={label} required={required} />
      {(type === 'textarea')
        ? <StyledTextArea {...props} error={error} />
        : <StyledInput
          removeGutter={Boolean(helptext)}
          type={type}
          error={error}
          {...props}
        />
      }
      <span>{helptext}</span>
    </React.Fragment>
  )
}

export const InputError = ({message, id }: {id: string, message: string}) => <StyledError id={id} className="field-validation-error">{message}</StyledError>