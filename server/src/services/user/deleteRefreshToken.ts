import User from '@models/user';

const deleteRefreshToken = async (userId: string) => {
  try {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default deleteRefreshToken;
