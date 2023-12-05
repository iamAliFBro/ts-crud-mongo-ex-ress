import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      succss: true,
      message: 'server is running.',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'server error',
      error,
    });
  }
});

export const testRouter = router;
