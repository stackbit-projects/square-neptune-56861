import React from 'react'
import { FormStorageNames } from '../../utils/constants'
import HeroSecondary from '../HeroSecondary'

const HeroDynamic = (props) => {
  const [name, setName] = React.useState<string>("")
  const { item: { fields } } = props.renderingContext

  React.useEffect(() => {
    if (fields["event page"]) {
      const storageData = JSON.parse(sessionStorage.getItem(fields["event page"]["id"]))
      if (storageData) {
        setName(storageData[FormStorageNames.Firstname])
      }
    }
  }, [])

  return (
    <React.Fragment>
      <HeroSecondary 
        renderingContext={{
          item: {
            fields: {
              herofocalpoint: fields["herofocalpoint"],
              heroimage: fields["hero image"],
              herotitle: fields["hero caption"].replace(fields["hero caption replacement field name"], name)
            }
          }
        }}
      />
    </React.Fragment>
  )
}

export default HeroDynamic