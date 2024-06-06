import { Grid } from '@trussworks/react-uswds'

function CMBFormHeader() {
  return (
    <>
      <Grid row>
        <Grid col={12}>
          <h1 className="underline-heading">Claim Your Business</h1>
          <h3>
            To claim your business, you must verify your business information
            with SAM.gov. If you have multiple businesses, you will need to
            verify each business separately.
          </h3>
        </Grid>
      </Grid>
    </>
  )
}
export default CMBFormHeader
