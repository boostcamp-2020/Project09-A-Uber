import { ExpressFunction } from '@type/ExpressFunction';
import createUser from '@services/user/createUser';

const userSignup: ExpressFunction = async (req, res, next) => {
  try {
    const { name, email, password, phone, payment } = req.body;
    const { result, message } = await createUser({ name, email, password, phone, payment });

    if (result === 'fail') {
      res.json({ result: 'fail', message });
    }
    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default userSignup;
