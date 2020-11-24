import { ExpressFunction } from '@type/ExpressFunction';
import createDriver from '@services/user/createDriver';

const driverSignup: ExpressFunction = async (req, res, next) => {
  try {
    const { name, email, password, phone, driver } = req.body;
    const { result, message } = await createDriver({ name, email, password, phone, driver });

    if (result === 'fail') {
      res.json({ result: 'fail', message });
    }
    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default driverSignup;
