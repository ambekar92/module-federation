import { render, screen } from "@testing-library/react";
import UserActivityList from "../components/UserActivityList";
import { ActivityItem } from "../types";
import { faker } from "@faker-js/faker";
import  user  from '@testing-library/user-event';

describe('UserActivityList', () => {
    it('should render', () => {
        const mockData = [] as ActivityItem [];
        render(<UserActivityList data={mockData} />);
        const headingEl = screen.getByRole('heading', {name: /Activity Stream/i, level: 1});
        expect(headingEl).toBeInTheDocument();

        const searchEl = screen.getByRole('search');
        expect(searchEl).toBeInTheDocument();

        const pagination = screen.getByRole('navigation');
        expect(pagination).toBeInTheDocument();
    });

    it('should display max 10 accordions', () => {
        const mockData: ActivityItem[] = Array(300).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const accordionElCnt = screen.getAllByRole('region').length;
        expect(accordionElCnt).toEqual(10);
    });
    it('should display max(10, activityItemsCnt) accordions', () => {
        const mockData: ActivityItem[] = Array(3).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(3), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const accordionElCnt = screen.getAllByRole('region').length;
        expect(accordionElCnt).toEqual(3);
    });

    test('user should see second page items when page 2 is clicked', async() => {
        user.setup();
        const mockData: ActivityItem[] = Array(30).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        const eleventhFullName = mockData[10].firstName + ' ' + mockData[10].lastName;
        render(<UserActivityList data={mockData}/>);
       const fullName = screen.queryByText(eleventhFullName);
       expect(fullName).not.toBeUndefined();
       const page2 = screen.getByLabelText('Page 2');
       await user.click(page2);
       const fullNameAfterClick = screen.queryByText(eleventhFullName);
       expect(fullNameAfterClick?.textContent).toEqual(eleventhFullName)
    })

    it('should apply usa-current class to the first page button initially', () => {
        const mockData: ActivityItem[] = Array(30).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const page1 = screen.getByLabelText('Page 1');
        const page2 = screen.getByLabelText('Page 2');
        expect(page1).toHaveClass('usa-current');
        expect(page2).not.toHaveClass('usa-current');   
    });

    it ('should apply usa-current class to the second page button when user clicks on second page button', async () => {
        user.setup();
        const mockData: ActivityItem[] = Array(30).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const page2 = screen.getByLabelText('Page 2');
        expect(page2).toBeInTheDocument();
        expect(page2).not.toHaveClass('usa-current');
        await user.click(page2);
        expect(page2).toHaveClass('usa-current');
    });

    it('should navigate user to next page when next button is clicked', async() => {
        user.setup();
        const mockData: ActivityItem[] = Array(30).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const nextButtonEl = screen.getByLabelText('Next page');
        expect(nextButtonEl).toBeInTheDocument();
        const page2 = screen.getByLabelText('Page 2')
        expect(page2).not.toHaveClass('usa-current')
        await user.click(nextButtonEl);
        const page2AfterClick = screen.getByLabelText('Page 2');
        const page1 = screen.getByLabelText('Page 1');
        expect(page2AfterClick).toHaveClass('usa-current')
        expect(page1).not.toHaveClass('usa-current')
    })
    
    it('should navigate user to previous page when previous button is clicked', async() => {
        user.setup();
        const mockData: ActivityItem[] = Array(30).fill({}).map(() => ({
            dateTime: faker.date.recent().toISOString(), 
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            description: faker.word.words(10), 
            title: faker.word.noun() }));
        render(<UserActivityList data={mockData} />);
        const page2 = screen.getByLabelText('Page 2')
        await user.click(page2);
        const prevButtonEl = screen.getByLabelText('Previous page');
        expect(prevButtonEl).toBeInTheDocument();
        const page1 = screen.getByLabelText('Page 1');
        expect(page1).not.toHaveClass('usa-current');
        expect(page2).toHaveClass('usa-current');
        await user.click(prevButtonEl);
        const page1AfterClick = screen.getByLabelText('Page 1');
        expect(page1AfterClick).toHaveClass('usa-current')
    })
    

});