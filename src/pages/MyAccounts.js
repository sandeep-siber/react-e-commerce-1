import { useEffect } from 'react';

import PageHeading from '../components/UI/PageHeading';
import PasswordChangeForm from '../components/Profile/PasswordChangeForm';
import Orders from '../components/Orders/Orders';
import ProfileForm from '../components/Profile/ProfileForm';

import useHttp from '../hooks/useHttp';
import { getOrders, sendUserProfile, getUserProfile } from '../lib/api';

function MyAccountsPage() {
  const userId = localStorage.getItem('userId');

  const {
    sendRequest: fetchOrders,
    status,
    data: loadedOrders,
    error,
  } = useHttp(getOrders, true);

  const {
    sendRequest: updateUserDetails,
    status: userDetailsSendStatus,
    data: userDetailsSendFeedback,
    error: userDetailsSendError,
  } = useHttp(sendUserProfile, false);

  const {
    sendRequest: fetchUserDetails,
    status: fetchUserDetailsStatus,
    data: fetchedUserProfile,
    error: fetchUserDetailsError,
  } = useHttp(getUserProfile, true);

  useEffect(() => {
    fetchOrders(userId);
  }, [userId, fetchOrders]);

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  function updateProfileHandler(profileData) {
    updateUserDetails(profileData);
  }

  const updateInfo = {
    updatStatus: userDetailsSendStatus,
    updateFeedback: userDetailsSendFeedback,
    updateError: userDetailsSendError,
  };

  const fetchInfo = {
    fetchUserDetailsStatus,
    fetchUserDetailsError,
    fetchedUserProfile,
  };

  return (
    <>
      <PageHeading>My Account</PageHeading>

      <Orders orders={loadedOrders} status={status} error={error} />

      <ProfileForm
        onConfirm={updateProfileHandler}
        updateInfo={updateInfo}
        fetchInfo={fetchInfo}
      />

      <br />

      <PasswordChangeForm />
    </>
  );
}
export default MyAccountsPage;
