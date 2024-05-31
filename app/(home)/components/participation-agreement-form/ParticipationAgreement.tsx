import ParticipationAgreementForm from './ParticipationAgreementForm'
import styles from './ParticipationAgreementForm.module.scss'

function ParticipationAgreement() {
  return (
    <div className={styles['agreements-form']}>
      <h1>
        U.S. Small Business Administration 8(a) Business Development Program
      </h1>
      <hr className={styles['top-form-divider']} />
      <ol className={styles['agreements-list']}>
        <li>Financial data</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we agree to submit financial statements (balance sheet and profit
            and loss statements) as required by SBA. I/we acknowledge that
            submission of such statements is mandatory and a condition of
            program participation. The profit and loss statements shall indicate
            separately the amount of sales via 8(a) subcontracts and non-8(a)
            business. Statements shall be:
          </p>
          <ol className={styles['agreements-inner-alpha']}>
            <li>
              Audited annual financial statements from a licensed independent
              public accountant for those concerns with actual receipts of more
              than $10,000,000 or more. Statements must be submitted within 120
              days after the close of the firm’s fiscal year. Financial data
              must always be signed and dated by the C.E.O., President or sole
              owner.
            </li>
            <li>
              Reviewed annual financial statements from a licensed independent
              public accountant for those concerns with gross annual receipts of
              $2,000,000 to $10,000,000. Statements must be submitted within 90
              days after the close of the firm’s fiscal year.
            </li>
            <li>
              Annual statements verified as to accuracy by the proprietor or an
              authorized officer, for those concerns with actual gross annual
              receipts less than $2,000,000.
            </li>
            <li>
              Quarterly un-audited statements when required, verified as to
              accuacy by the proprietor, a partner or an authorized officer
              regardless of amount of gross receipts, which may be prepared
              internally or by an independent qualified public accountant.
            </li>
            <li>
              Audited or reviewed annual and/or quarterly statements may be
              required from a licensed independent public accountant when the
              SBA decides it is vital to obtain a more thorough verification of
              a concern’s financial position. Such as when a concern’s capacity
              to perform specific 8(a) contract must be determined or when
              needed to determine continued program eligibility.
            </li>
            <li>
              Less than $2,000,000 must submit prepared in-house or compiled
              statements. Statements must be submitted within 90 days of the
              close of the firm’s fiscal year;
            </li>
            <li>
              Participants with gross annual receipts of more than $10,000,000
              which are owned by a Tribe, Alaska Native Corporation, Native
              Hawaiian Organization, or the Community Development Corporation
              may elect to submit unaudited financial statements within 120 days
              after the close of concern’s fiscal year, provided the following
              additional documents are submitted simultaneously:
            </li>
          </ol>
          <ol className={styles['agreements-inner-roman']}>
            <li>
              Audited financial statements for the parent company owner of the
              Participant, prepared by a licensed independent public accountant,
              for the equivalent fiscal year.
            </li>
            <li>
              Certification from the Participant’s Chief Executive Officer and
              Chief Financial Officer (or comparable positions) that each
              individual has read the unaudited financial statements, affirms
              that the statements do not contain any material misstatements, and
              certifying that the statements fairly represent the Participant’s
              financial condition and result in operation.
            </li>
          </ol>
        </div>
        <li>Personal & business income tax returns</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we agree to annually submit copies of personal and business
            Federal Income Tax returns filed with the IRS. I/We understand and
            acknowledge the criminal penalties and administrative remedies for
            making false statements. Title 18 U.S.C. § 1001 and Title 15 U.S.C.
            § 645.
          </p>
        </div>
        <li>Program termination</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we acknowledge that one cause for termination of an 8(a) concern
            in the program is failure or refusal to provide SBA with required
            quarterly and annual financial statements and reports within 90 days
            for compiled and reviewed statements and 120 days for audited
            statements after the close of the quarter and any other such reports
            as SBA may require.
          </p>
          <ol className={styles['agreements-inner-number']}>
            <li>
              Income Tax Returns: I/we agree to submit copies of personal income
              tax returns for all persons upon whom eligibility is based as well
              as business income tax returns as required by SBA.
            </li>
            <li>Criteria for program termination:</li>
            <div className={styles['agreements-inner-content']}>
              <p>
                I/we agree that my (our) firm may be terminated from the 8(a)
                program upon the occurrence of one or more of the following:
              </p>
              <ol className={styles['agreements-inner-alpha']}>
                <li>
                  Failure by the concern to continue to maintain its eligibility
                  for program participation.
                </li>
                <li>
                  Failure by the concern to continue to maintain its status as a
                  small business under the Small Business Act, as amended, and
                  the regulations promulgated there under.
                </li>
                <li>
                  Failure by the concern for any reason, including the death of
                  an individual upon whom eligibility was based, to maintain
                  ownership, full-time day-to-day management, and control by the
                  person(s) who has (have)been determined to be socially and
                  economically-disadvantaged.
                </li>
              </ol>
            </div>
          </ol>
        </div>
        <li>Discriminatory Prohibitions</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we give assurance that the concern will comply with Sections 112
            and 113 of Title 13 of the Code of Federal Regulations. These code
            sections prohibit discrimination on the grounds of race, color, sex,
            religion, marital status, handicap, age or national origin.
          </p>
        </div>
        <li>Access to records</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we agree to fully cooperate with any and all requests from
            authorized government officials (including auditors and
            investigators from SBA or other agencies) for examination of
            business records and any other information deemed necessary by such
            officials for legitimate program purposes. Furthermore, I/we agree
            to participate in any interviews which may be requested by such
            authorized government official(s).
          </p>
        </div>
        <li>Access to records</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we agree that the business plan submitted by this firm to the SBA
            will include specific targets, objectives and goals for the business
            development of the Program Participant (hereinafter referenced as
            “Development Goals”). These Development Goals must be based upon the
            industry mean for small businesses in the participant’s primary
            NAICS code in seven categories: total assets, current ratio,
            debt/net worth ratio, net worth, net sales, pre-tax profit,
            sales/working capital ratio, and determined to be satisfactory to
            SBA. I/we agree that SBA will determine that this firm has
            substantially achieved these Development Goals when the firm exceeds
            the industry mean for small businesses in four of these seven
            categories for two consecutive years. When SBA determines that the
            participant has substantially achieved its Development Goals, I
            further agree that SBA will graduate the firm from the 8(a) Business
            Development Program.
          </p>
        </div>
        <li>Annual review documentation</li>
        <div className={styles['agreements-inner-content']}>
          <p>
            I/we agree to submit all of the required annual review
            documentation. I/We acknowledge that the signature and date of my
            annual review submission represents that I/we have read and agree to
            abide by the details of this Participation Agreement and the 8(a) BD
            regulations found in, 13 C.F.R. § 124, which can be found at 13
            C.F.R. § 124.
          </p>
        </div>
      </ol>
      <ParticipationAgreementForm />
    </div>
  )
}

export default ParticipationAgreement
