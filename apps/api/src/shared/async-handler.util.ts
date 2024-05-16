interface ErrorHandler {
  (error: any): any;
}

interface WrappedFunction {
  (...args: any[]): Promise<any> | any;
}

const handler = (fn: WrappedFunction): WrappedFunction => {
  return async (...args: any[]) => {
    const fnReturn = fn(...args);
    const next: ErrorHandler | undefined =
      args.length > 0 ? args[args.length - 1] : undefined;

    if (next && typeof next !== 'function') {
      throw new Error(
        'Error handler provided to async handler must be a function'
      );
    }

    try {
      return await fnReturn;
    } catch (error) {
      if (next) {
        return next(error);
      } else {
        throw error;
      }
    }
  };
};

export default handler;
