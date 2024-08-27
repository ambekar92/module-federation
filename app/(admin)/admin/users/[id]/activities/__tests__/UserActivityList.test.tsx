import { render, screen } from '@testing-library/react';
import UserActivityList from '../components/UserActivityList';
import { IAction } from '../types';
import { faker } from '@faker-js/faker';
import  user  from '@testing-library/user-event';

function getMockData(n: number): IAction[]{
  const mockData: IAction[] = Array(n).fill({}).map((el, idx) => {
    return {
      id: idx+'',
      url: faker.internet.url(),
      verb: 'started following',
      published: faker.date.recent().toISOString(),
      actor: {
        id: idx+'',
        url: faker.internet.url(),
        objectType: 'user',
        displayName: faker.person.fullName()
      },
      title: `${faker.person.fullName()} started following minutes ago`,
      target: {
        id: idx+'',
        url: faker.internet.url(),
        objectType: 'user',
        displayName: `${faker.person.fullName()}`
      }
    };
  });
  return mockData
}

describe('UserActivityList', () => {
  it('should render', () => {
    const mockData = [] as IAction [];
    render(<UserActivityList data={mockData} />);
    const headingEl = screen.getByRole('heading', {name: /Activity Stream/i, level: 1});
    expect(headingEl).toBeInTheDocument();

    const searchEl = screen.getByRole('search');
    expect(searchEl).toBeInTheDocument();

  });

  it('should display max 10 accordions', () => {
    const mockData = getMockData(30)
    render(<UserActivityList data={mockData} />);
    const accordionElCnt = screen.getAllByRole('region').length;
    expect(accordionElCnt).toEqual(10);
  });
  it('should display max(10, activityItemsCnt) accordions', () => {
    const mockData =  getMockData(3)
    render(<UserActivityList data={mockData} />);
    const accordionElCnt = screen.getAllByRole('region').length;
    expect(accordionElCnt).toEqual(3);
  });

  test('user should see second page items when page 2 is clicked', async() => {
    user.setup();
    const mockData =  getMockData(30)
    const eleventhFullName = mockData[10].actor.displayName;
    render(<UserActivityList data={mockData}/>);
    const fullName = screen.queryByText(eleventhFullName);
    expect(fullName).not.toBeUndefined();
    const page2 = screen.getByLabelText('Page 2');
    await user.click(page2);
    const fullNameAfterClick = screen.queryByText(eleventhFullName);
    expect(fullNameAfterClick?.textContent).toEqual(eleventhFullName)
  })

  it('should apply usa-current class to the first page button initially', () => {
    const mockData = getMockData(30)
    render(<UserActivityList data={mockData} />);
    const page1 = screen.getByLabelText('Page 1');
    const page2 = screen.getByLabelText('Page 2');
    expect(page1).toHaveClass('usa-current');
    expect(page2).not.toHaveClass('usa-current');
  });

  it ('should apply usa-current class to the second page button when user clicks on second page button', async () => {
    user.setup();
    const mockData =  getMockData(30);
    render(<UserActivityList data={mockData} />);
    const page2 = screen.getByLabelText('Page 2');
    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('usa-current');
    await user.click(page2);
    expect(page2).toHaveClass('usa-current');
  });

  it('should navigate user to next page when next button is clicked', async() => {
    user.setup();
    const mockData =  getMockData(30)
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
    const mockData =  getMockData(30)
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
