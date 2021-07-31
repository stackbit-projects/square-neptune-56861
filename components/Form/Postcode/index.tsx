import React from 'react'
import axios from 'axios'
import { DropDown } from '../Elements/index';
import { focusFormField } from '../../../utils/formUtils';
import { StyledDropdown, StyledInput, InlineStyledInput, InlineWrapper } from '../Form.styles';
import { InlineStyledButton } from '../Form.styles';

export interface AddressProps {
  id: string
  label: string
  addressline1: string
  addressline2?: string
  addressline3?: string
  town: string
  county?: string
  country: string
  postcode: string
}

const getAddress = async (postcode: string) => {
  const apiURL = `/api-fe/postcodeLookup`
  return axios.get(`${apiURL}?postcode=${postcode}`)
    .then(({data}) => {
      return data
    })
    .catch((error) => {
      return []
    });
}

const countries = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Åland Islands", label: "Åland Islands" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Anguilla", label: "Anguilla" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Aruba", label: "Aruba" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bermuda", label: "Bermuda" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia (Plurinational State of)", label: "Bolivia (Plurinational State of)" },
  { value: "Bonaire, Sint Eustatius and Saba", label: "Bonaire, Sint Eustatius and Saba" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Bouvet Island", label: "Bouvet Island" },
  { value: "Brazil", label: "Brazil" },
  { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" },
  { value: "Brunei Darussalam", label: "Brunei Darussalam" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cabo Verde", label: "Cabo Verde" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Cayman Islands", label: "Cayman Islands" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Christmas Island", label: "Christmas Island" },
  { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo", label: "Congo" },
  { value: "Congo, Democratic Republic of the", label: "Congo, Democratic Republic of the" },
  { value: "Cook Islands", label: "Cook Islands" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Curaçao", label: "Curaçao" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czechia", label: "Czechia" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)" },
  { value: "Faroe Islands", label: "Faroe Islands" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "French Guiana", label: "French Guiana" },
  { value: "French Polynesia", label: "French Polynesia" },
  { value: "French Southern Territories", label: "French Southern Territories" },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Gibraltar", label: "Gibraltar" },
  { value: "Greece", label: "Greece" },
  { value: "Greenland", label: "Greenland" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guadeloupe", label: "Guadeloupe" },
  { value: "Guam", label: "Guam" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guernsey", label: "Guernsey" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Heard Island and McDonald Islands", label: "Heard Island and McDonald Islands" },
  { value: "Holy See", label: "Holy See" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran (Islamic Republic of)", label: "Iran (Islamic Republic of)" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Isle of Man", label: "Isle of Man" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jersey", label: "Jersey" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Korea (Democratic People's Republic of)", label: "Korea (Democratic People's Republic of)" },
  { value: "Korea, Republic of", label: "Korea, Republic of" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Macao", label: "Macao" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Martinique", label: "Martinique" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mayotte", label: "Mayotte" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia (Federated States of)", label: "Micronesia (Federated States of)" },
  { value: "Moldova, Republic of", label: "Moldova, Republic of" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar", label: "Myanmar" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Caledonia", label: "New Caledonia" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Niue", label: "Niue" },
  { value: "Norfolk Island", label: "Norfolk Island" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Palestine, State of", label: "Palestine, State of" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Pitcairn", label: "Pitcairn" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Qatar", label: "Qatar" },
  { value: "Réunion", label: "Réunion" },
  { value: "Romania", label: "Romania" },
  { value: "Russian Federation", label: "Russian Federation" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Barthélemy", label: "Saint Barthélemy" },
  { value: "Saint Helena, Ascension and Tristan da Cunha", label: "Saint Helena, Ascension and Tristan da Cunha" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  { value: "Saint Martin (French part)", label: "Saint Martin (French part)" },
  { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
  { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Sint Maarten (Dutch part)", label: "Sint Maarten (Dutch part)" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Georgia and the South Sandwich Islands", label: "South Georgia and the South Sandwich Islands" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
  { value: "Taiwan, Province of China", label: "Taiwan, Province of China" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania, United Republic of", label: "Tanzania, United Republic of" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tokelau", label: "Tokelau" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United Kingdom of Great Britain and Northern Ireland", label: "United Kingdom of Great Britain and Northern Ireland" },
  { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" },
  { value: "United States of America", label: "United States of America" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Venezuela (Bolivarian Republic of)", label: "Venezuela (Bolivarian Republic of)" },
  { value: "Viet Nam", label: "Viet Nam" },
  { value: "Virgin Islands (British)", label: "Virgin Islands (British)" },
  { value: "Virgin Islands (U.S.)", label: "Virgin Islands (U.S.)" },
  { value: "Wallis and Futuna", label: "Wallis and Futuna" },
  { value: "Western Sahara", label: "Western Sahara" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
]

interface ManualAddressProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: any;
  touched: any;
  values: AddressProps | null
  address1Ref: React.RefObject<HTMLElement>
  townRef: React.RefObject<HTMLElement>
  countryRef: React.RefObject<HTMLElement>
  postcodeManualRef: React.RefObject<HTMLElement>
}

const ManualAddress = (props: ManualAddressProps) => {
  const [selectedCountry, setSelectedCountry] = React.useState<string>('United Kingdom');
  const isUK = selectedCountry === 'United Kingdom';
  const postCodeLabel = !isUK ? 'Postcode' : 'Postcode *'
    
  const errorAddress1 = props.touched?.address?.addressline1 ? props.errors['address.addressline1'] : false
  const errorTown = props.touched?.address?.town ? props.errors['address.town'] : false
  const errorCountry = props.touched?.address?.country ? props.errors['address.country'] : false
  const errorPostcode = props.touched?.address?.postcode && isUK ? props.errors['address.postcode'] : false

  const changeCountry  = (e) => {
    setSelectedCountry(e.target.value)
    props.onChange(e)
  }

  return (
    <div className="postcode-lookup-step-3">
      <label htmlFor="address.addressline1" aria-required={true}>Address line 1 *</label>
      <StyledInput 
        name="address.addressline1"
        id="address.addressline1"
        type="text"
        error={errorAddress1}
        ref={props.address1Ref}
        value={props.values.addressline1}
        autoComplete="address-line1"
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {props.touched?.address?.addressline1 && <span className="field-validation-error">{props.errors['address.addressline1']}</span>}

      <label htmlFor="address.addressline2">Address line 2</label>
      <StyledInput 
        name="address.addressline2"
        id="address.addressline2"
        type="text"
        value={props.values.addressline2}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />

      <label htmlFor="address.addressline3">Address line 3</label>
      <StyledInput 
        name="address.addressline3"
        id="address.addressline3"
        type="text"
        value={props.values.addressline3}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />

      <label htmlFor="address.city" aria-required={true}>Town/City *</label>
      <StyledInput
        name="address.town"
        id="address.town"
        type="text"
        error={errorTown}
        ref={props.townRef}
        value={props.values.town}
        autoComplete="address-level1"
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {props.touched?.address?.town &&<span className="field-validation-error">{props.errors['address.town']}</span>}

      <label htmlFor="address.county">County</label>
      <StyledInput
        name="address.county"
        id="address.county"
        type="text"
        value={props.values.county}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />

      <DropDown
        label='Country'
        name="address.country"
        value={selectedCountry}
        options={countries}
        rows={0}
        required={isUK}
        error={errorCountry}
        onChange={(e) => changeCountry(e)}
        onBlur={props.onBlur}
        type=''
      />
      
      {props.touched?.address?.country &&<span className="field-validation-error">{props.errors['address.country']}</span>}

      <label htmlFor="address.postcode" aria-required={isUK}>{postCodeLabel}</label>
      <StyledInput
        name="address.postcode"
        id="address.postcode"
        type="text"
        error={isUK && errorPostcode}
        ref={props.postcodeManualRef}
        value={props.values.postcode}
        autoComplete="postal-code"
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {isUK && props.touched?.address?.postcode &&<span className="field-validation-error">{props.errors['address.postcode']}</span>}

    </div>
  )
}

const Postcode = ({ onSubmit, values, onChange, onBlur, formErrors, touchedFields, firstErrorKey}) => {
  
  const postcodeLookupInputRef = React.useRef(null)
  const postcodeLookupDropdownRef = React.useRef(null)

  const address1Ref = React.useRef(null)
  const townRef = React.useRef(null)
  const countryRef = React.useRef(null)
  const postcodeManualRef = React.useRef(null)

  const [postcodeEntered, setPostcodeEntered] = React.useState("")
  const [showError, setShowError] = React.useState(false)
  const [isLookingUp, setIsLookingUp] = React.useState(false)
  const [addresses, setAddresses] = React.useState<AddressProps[]>([])
  const [manualEntry, setManualEntry] = React.useState(false)
  const postcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/i; // UK Postcode regex

  React.useEffect(() => {
    const addressError = formErrors && Object.keys(formErrors).find(formError => formError.includes('address'))
    if ((touchedFields.address && touchedFields.address.addressline1) && addressError) {
      setShowError(true)
    } else {
      setShowError(false)
    }

    let erroringFieldRef:any  = null;
    if (!manualEntry && showError) {
      if (firstErrorKey === 'address.addressline1') {
        erroringFieldRef = isLookingUp ? postcodeLookupDropdownRef : postcodeLookupInputRef
      }
    } else if (manualEntry && showError) {
        switch(addressError) {
          case "address.addressline1":
            if (firstErrorKey === 'address.addressline1') erroringFieldRef = address1Ref
            break;
          case "address.town":
            if (firstErrorKey === 'address.town') erroringFieldRef = townRef
            break;
          case "address.country":
            if (firstErrorKey === 'address.country') erroringFieldRef = countryRef
            break;
          case "address.postcode":
            if (firstErrorKey === 'address.postcode' && values['country'] === 'United Kingdom') erroringFieldRef = postcodeManualRef
            break; 
          default:
            // code block
        } 
    }

    if (erroringFieldRef && erroringFieldRef.current != null) {
      erroringFieldRef.current.scrollIntoView({ behavior: 'smooth' })
      focusFormField(erroringFieldRef.current, erroringFieldRef === postcodeLookupInputRef ? 'input' : null)
    }

  }, [formErrors, firstErrorKey, touchedFields])

  const onLookup = async () => {
    if (postcodeEntered && postcodeRegex.test(postcodeEntered)) {
      const response = await getAddress(postcodeEntered)
      setAddresses(response)
      setIsLookingUp(true)
      postcodeLookupDropdownRef && postcodeLookupDropdownRef.current.focus()
    } else {
      setShowError(true)
    }
  }

  const onAddressSelection = (id: string) => {
    const selectedAddress = addresses.find(address => address.id === id)
    onSubmit(selectedAddress)
    setManualEntry(true)
  }

  const validLookup = isLookingUp && postcodeEntered

  return (
    <div>
      {!validLookup &&
        <InlineWrapper>
          <label htmlFor="PostcodeLookupInput">Postcode *</label>
          <InlineStyledInput
            type="text"
            name="address"
            ref={postcodeLookupInputRef}
            error={(postcodeEntered && postcodeRegex.test(postcodeEntered)) ? false : !manualEntry && showError}
            onBlur={onBlur}
            className={`${showError ? 'input-validation-error' : ''}`}
            aria-label="Postcode"
            value={postcodeEntered}
            autoComplete="nope"
            onChange={e => setPostcodeEntered(e.target.value)}
          />

          {showError && !manualEntry &&
            <span id="PostcodeError" className="field-validation-error">
              Please enter a postcode and find your address.
            </span>
          }
          <InlineStyledButton type="button"  onClick={onLookup}>Find address</InlineStyledButton>
        </InlineWrapper>
      }

      {validLookup &&
        <div>
          <label>Postcode *</label>
          <p>
            <span id="EnteredPostcode">{postcodeEntered}</span>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              onSubmit({})
              setManualEntry(false)
              setIsLookingUp(false)
            }}>Change postcode</a>
          </p>

          <label htmlFor="postcode">Select address *</label>
          <StyledDropdown ref={postcodeLookupDropdownRef} name="postcode" id="postcode" onChange={e => onAddressSelection(e.target.value)} error={showError}>
            <option value="">Please select an address</option>
            {addresses.map(address => <option value={address.id}>{address.label}</option>)}
          </StyledDropdown>
        </div>
      }

      {!manualEntry && <p>or <a id="EnterManually" href="#" onClick={(e) => { e.preventDefault(); setManualEntry(true)}}>click here if you are a non-UK resident</a></p>}
      {manualEntry && 
        <ManualAddress
          touched={touchedFields}
          errors={formErrors}
          values={values}
          onBlur={onBlur}
          onChange={onChange}
          address1Ref = {address1Ref}
          townRef = {townRef}
          countryRef = {countryRef}
          postcodeManualRef = {postcodeManualRef}
        />
      }
    </div>
  )
}

export default Postcode