import { Application } from '@/app/services/types/application-service/Application';
import React from 'react';

export const formatFullDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

export function extractBodyContent(html: string): string {
  // const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/i;
  // const match = html.match(bodyRegex);

  // if (match && match[1]) {
  //   return match[1].trim();
  // }

  // If no body tags found, return the original HTML
  return html;
}
export const generateDefaultText = (applicationData: Application, today: Date) => {
  const content = `
${formatFullDate(today)}

${applicationData.business_point_of_contact.first_name} ${applicationData.business_point_of_contact.last_name} (Qualifying Owner)

${applicationData.sam_entity.legal_business_name}
${applicationData.sam_entity.physical_addr_1} ${applicationData.sam_entity.physical_addr_2 ?? ''}
${applicationData.sam_entity.physical_city}, ${applicationData.sam_entity.physical_state_or_province} ${applicationData.sam_entity.physical_zip_code_5}

Dear ${applicationData.business_point_of_contact.first_name} ${applicationData.business_point_of_contact.last_name},

This letter is to inform you that the U.S. Small Business Administration (SBA) has completed a thorough review of your submission and that your application for the following SBA certification(s) has been declined:

- [8(a) Business Development (8(a) BD) Program]
- [HUBZone Program]
- [Women-Owned Small Business (WOSB)]
- [Economically Disadvantaged Women-Owned Small Business (EDWOSB)]
- [Veteran-Owned Small Business (VOSB)]
- [Service-Disabled Veteran-Owned Small Business (SDVOSB)]

SBA's determination is based on an analysis of information contained in your application and any additional information and documentation submitted. To help you better understand the reason(s) for this decision as well as possible next steps, please review the attached supplemental pages carefully.

If you have questions regarding your application decline please email our Customer Support Group Help Desk at temp-email@test.com or call XXX-XXX-XXX to meet with an SBA analyst.

Steps for Reapplication:

In accordance with SBA regulations, in 90 days you may reapply for the program. When reapplying, you may submit new information to correct any deficiencies in your initial application and otherwise come into compliance with SBA's eligibility. Please note that if you have uploaded documents in the [UCP system], then those documents will be available when you reapply.

However, please include updated personal financial information, business financial statements, and any documentation you wish to provide to come into compliance with SBA's eligibility requirements.

If you need assistance with resubmitting your application, there are valuable resources available to help you at no cost.

Resources

If you need assistance with reapplying for the [certification] program, there are valuable resources available to help you at no cost:

Your local SBA District Office.
Your district office is:

District Office
EM: x@sba.gov
PH: (xxx) xxx-xxxx

SBA Resource Partners:
SBA encourages you to locate your nearest Resource Partner at the following link: https://www.sba.gov/local-assistance. This link also provides access to upcoming small business events and the webpage for your servicing SBA District Office.

Small Business Regulatory Enforcement Fairness Act:
If you believe your small business has been the subject of excessive or unfair regulatory enforcement or compliance actions as a result of this decision, you have the right under the Small Business Regulatory Enforcement Fairness Act to file a complaint or comment with SBA's National Ombudsman at:

Office of the National Ombudsman
U.S. Small Business Administration
409 Third St. SW
Washington, DC 20416
PH: 1-888-734-3247
FX: 1-202-481-5719
EM: ombudsman@sba.gov
			`.trim();

  return {
    asJSX: (
      <>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>
            {paragraph.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < paragraph.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </>
    ),
    asString: content
  };
};

export const pdfTabStyles = `
	body {
		background-color: #4a4a4a;
		margin: 0;
		padding: 20px;
		display: flex;
		justify-content: center;
		min-height: 100vh;
	}
	.page {
		background-color: white;
		width: 210mm;
		min-height: 297mm;
		padding: 20mm;
		margin: 0 auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	@media print {
		body {
			background-color: white;
		}
		.page {
			width: 210mm;
			height: 297mm;
			box-shadow: none;
			margin: 0;
			padding: 0;
		}
	}
	.content {
		font-family: Arial, sans-serif;
		line-height: 1.6;
	}
`
