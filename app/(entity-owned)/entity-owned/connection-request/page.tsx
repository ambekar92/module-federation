import dynamic from 'next/dynamic';

const DynamicPendingRequests = dynamic(() => import('../../components/connection-requests/PendingRequests'), { ssr: false });

const ConnectionRequest = () => {
  return (
    <>
      <h1 className="margin-bottom-0">Connection Requests</h1>
      <hr style={{ margin: '1rem 0' }} />
      <DynamicPendingRequests />
    </>
  )
}

export default ConnectionRequest
