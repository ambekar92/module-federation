import { Show } from '@/app/shared/components/Show';
import { Alert } from '@trussworks/react-uswds';
import Programs from './components/Programs';
import WhatsNext from './components/WhatsNext';

const ResultsPage = async () => {
    const programs = await getPrograms();

    return (
        <>
            <header>
                <h2>Results</h2>
            </header>
            <main>
                <Show>
                    <Show.When isTrue={true}>
                <Alert type='success' headingLevel='h2' heading='You May Be Eligible'>
                    <span>Based on your responses, you may be eligibe for the following SBA Certification Programs.</span>
                </Alert>

                

                <Programs programs={programs} />
                <WhatsNext />
                </Show.When>
                <Show.Otherwise>
                    <Alert type='warning' headingLevel='h2' heading='You May Not Be Eligible'>
                        <span>Based on your responses, you are not eligible for any SBA Certification Program. Review the eligibility criteria details <a target='_blank' href='https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program#section-header-4'>here</a></span>
                        </Alert>
                </Show.Otherwise>
                </Show>
            </main>
        </>
    )
}

export default ResultsPage

async function getPrograms(): Promise<any[]> {
    // uncomment and use correct endpoint when api is ready
    // const response = await fetch('/api/programs');
    // const programs = await response.json();

    // temporary mock data
    const programs = await new Promise<any[]>((resolve) => setTimeout(() => resolve([
        {
            title: '8(a)',
            subtitle: '8(a) Business Development Program',
            description: 'The 8(a) Business Development Program is a business assistance program for small disadvantaged businesses. The 8(a) Program offers a broad scope of assistance to firms that are owned and controlled at least 51% by socially and economically disadvantaged individuals.',
        },
        {
            title: 'HUBZone',
            subtitle: 'Historically Underutilized Business Zone Program',
            description: 'The HUBZone program helps small businesses in urban and rural communities gain preferential access to federal procurement opportunities. These preferences go to small businesses that obtain HUBZone certification in part by employing staff who live in a HUBZone.',
        },
        {
            title: 'WOSB',
            subtitle: 'Woman-Owned',
            description: 'The WOSB Federal Contract Program was implemented in February 2011 with the goal of expanding the number of industries where WOSB were able to compete for business with the federal government.',
        },
        {
            title: 'SDVOSB',
            subtitle: 'Service-Disabled Veteran-Owned Small Business Program',
            description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.',
        },
        {
            title: 'SBIR/STTR',
            subtitle: 'Small Business Innovation Research Program',
            description: 'The Small Business Innovation Research (SBIR) program is a highly competitive program that encourages domestic small businesses to engage in Federal Research/Research and Development (R/R&D) that has the potential for commercialization'
        },
        {
            title: 'SBIR/STTR',
            subtitle: 'Small Business Technology Transfer Program',
            description: 'The Small Business Technology Transfer (STTR) program expands funding opportunities in the federal innovation research and development (R&D) arena. Central to the program is expansion of the public/private sector partnership to include the joint venture opportunities for small businesses and nonprofit research institutions.'
        },
        {
            title: 'SBIR/STTR',
            subtitle: 'Small Business Technology Transfer Program',
            description: 'The Small Business Technology Transfer (STTR) program expands funding opportunities in the federal innovation research and development (R&D) arena. Central to the program is expansion of the public/private sector partnership to include the joint venture opportunities for small businesses and nonprofit research institutions.'
        }
    ]), 1000))

    return programs;

}