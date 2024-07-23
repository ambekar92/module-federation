import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tag
} from '@trussworks/react-uswds';
import moment from 'moment';
import { JSXElementConstructor, ReactElement } from 'react';

interface FirmApplicationCardProps {
	title: string;
  id: number;
  status: 'In progress' | 'Submitted' | string;
  percentComplete?: number;
  programs?: string[];
	updatedDate?: string;
	createdDate?: string;
  clickedId: number | null;
  actionButton: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  // eslint-disable-next-line no-unused-vars
  applicationDeleteOrWithdraw: (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => Promise<void>;
}
const FirmApplicationCard: React.FC<FirmApplicationCardProps> = ({
  title,
  id,
  status,
  percentComplete,
  programs,
  updatedDate,
  createdDate,
  clickedId,
  actionButton,
  applicationDeleteOrWithdraw,
}) => {
  return (
    <Card containerProps={{ className: 'bg-primary-lighter border-0' }}>
      <CardHeader className="display-flex flex-row flex-justify">
        <h4>{title}</h4>
        {clickedId === id ? (
          actionButton
        ) : (
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            data-status={status}
            className="cursor-pointer"
            onClick={(e) => applicationDeleteOrWithdraw(e, id)}
          />
        )}
      </CardHeader>
      <CardBody>
        {status === 'In progress' && percentComplete && (
          <span>{percentComplete}% Complete</span>
        )}
      </CardBody>
      <CardFooter className="display-flex flex-row flex-align-center">
        <div>
          {programs && programs.length > 0 && (
            <div aria-label="Application">
              {programs.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          {status && updatedDate && (
            <div className="display-flex flex-row">
              <div className="margin-right-2">
                <strong>ID:</strong> {id}
              </div>
              <div>
                <strong>{status === 'draft' ? 'Last Updated:' : 'Submitted:'}</strong>{' '}
                {moment(updatedDate).format('MM/DD/YYYY')}
              </div>
            </div>
          )}
        </div>
        {status !== 'Submitted' && (
          <Button className="margin-left-auto" type="button">
            {status === 'In progress' ? 'Continue' : 'Start'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
export default FirmApplicationCard
